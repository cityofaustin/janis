import boto3, os, json, datetime, uuid, hashlib, sys
from boto3.s3.transfer import S3Transfer
import subprocess

#
# We need access to a few environment variables
#
DEPLOYMENT_MODE           = os.getenv("DEPLOYMENT_MODE", "LOCAL")
S3_KEY                    = os.getenv("AWS_ACCESS_KEY_ID", "")
S3_SECRET                 = os.getenv("AWS_SECRET_ACCESS_KEY", "")
S3_BUCKET                 = os.getenv("AWS_BUCKET_NAME", "")

S3_LOCATION               = 'http://{}.s3.amazonaws.com/'.format(S3_BUCKET)
DEFAULT_REGION            = os.getenv("AWS_DEFAULT_REGION", "us-east-1")
CF_DISTRO                 = os.getenv("AWS_CF_DISTRO", "")

S3_DEPLOYMENT_PATH        = os.getenv("DEPLOYMENT_PATH", "")


#
# New Build Origin ID
#
NEW_BUILD_ID=None



# Let's show them
print("DEPLOYMENT_MODE: " + DEPLOYMENT_MODE)
print("S3_KEY: " + S3_KEY)
print("S3_SECRET: " + str(len(S3_SECRET)))
print("S3_BUCKET: " + S3_BUCKET)
print("S3_LOCATION: " + S3_LOCATION)
print("DEFAULT_REGION: " + DEFAULT_REGION)
print("CF_DISTRO: " + CF_DISTRO)




#
# First, we need to set up boto3 clients/resources:
#
cloudfront = boto3.client('cloudfront')
s3 = boto3.client("s3",region_name=DEFAULT_REGION)
s3r = boto3.resource("s3",region_name=DEFAULT_REGION).Bucket(S3_BUCKET)

# Load allows to parse a text json file straight from s3, dump saves it straight on s3
json.load_s3 = lambda f: json.load(s3r.Object(key=f).get()["Body"])
json.dump_s3 = lambda obj, f: s3r.Object(key=f).put(Body=json.dumps(obj))

#
# Helper Functions
#

def print_fancy_msg(msg):
    """Simply gives us clearer verbose appearance"""
    print("---------------------------------------------")
    print("-- ")
    print("-- " + msg)
    print("-- ")
    print("---------------------------------------------")

def stop_build(msg):
    """Stops the deployment, no questions asked."""
    print_fancy_msg("ERROR (Halting Deployment): " + msg)
    sys.exit(1)

def get_timestamp_iso(build_timestamp = True):
    """Returns an iso date, ie: '2019-04-14-18-53-53' """
    format = "%Y-%m-%d--%-H-%M-%S" if build_timestamp else "%Y-%m-%d %-H-%M-%S"
    return datetime.datetime.now().strftime(format)

def get_random_hash():
    """Returns an 8-character long random hash string, ie: '9d3b31f6' """
    return str(hashlib.md5(str(uuid.uuid1()).encode()).hexdigest())[0:8]

def generate_janis_id():
    """Generates a janis build id with a timestamp and random hash"""
    timestamp = get_timestamp_iso()
    rand_hash = get_random_hash()
    return "janis-prod-{0}-{1}".format(timestamp, rand_hash)

def load_json_s3(s3_file_key):
    """Download and parse object straight from S3"""
    print("parse_aws_json_file() Getting file: " + s3_file_key)
    try:
        return json.load_s3(s3_file_key)
    except Exception as e:
        print("parse_aws_json_file() Exception: " + str(e))
        return None

def write_json_s3(data, s3_file_key):
    """Writes a dictionary into file in s3"""
    print("write_file_s3() writing file: " + s3_file_key)
    json.dump_s3(data, s3_file_key)


def upload_file_s3(filepath, s3_file_key):
    """Uploads local file 'filepath' to 's3_file_key' to s3"""
    transfer = S3Transfer(s3)
    transfer.upload_file(filepath, S3_BUCKET, s3_file_key)
    return

def generate_new_janis_object():
    """Generates a dictionary a unique build id and timestamp (for our build logs)"""
    print("generate_new_janis_object() Generating new janis object...")
    return {
        "build_id": generate_janis_id(),
        "timestamp": get_timestamp_iso(False)
    }


def origin_exists(dist_settings, origin_id):
    """Returns True if origin_id exists in the origins list"""
    for origin in dist_settings["DistributionConfig"]["Origins"]["Items"]:
        if(origin["Id"] == origin_id):
            return True


def update_cloudfront(distribution_settings):
    """Updates the configuration in cloudfront, prints output for logging?"""
    response = cloudfront.update_distribution(
        Id=CF_DISTRO,
        IfMatch=distribution_settings["ETag"],
        DistributionConfig=distribution_settings["DistributionConfig"]
    )

    print("CloudFront - Update Response:")
    print(response)


def print_config(config):
    """Fancy printing of configuration"""
    print("\n\n")
    print("------------------------------------------------")
    print(json.dumps(config))
    print("------------------------------------------------")
    print("\n\n")

def write_janis_id(janis_id):
  """This function helps us pass a janis build id back to bash"""
  janis_build_id = open("janis_build_id","w")
  janis_build_id.write("{0}".format(janis_id))
  janis_build_id.close()


def run_command_live(command):
  """Runs a subprocess and prints the output text"""
  print(command)
  p = subprocess.Popen(command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

  stdout = []
  while True:
    # Gather output and assign to line
    line = p.stdout.readline()
    # Append stdout
    stdout.append(line)
    # Decode from byte array to utf and remove line breaks
    cleanline = line.decode('utf-8').rstrip("\r\n")
    print(cleanline)

    if cleanline == '' and p.poll() != None:
      break
  sys.stdout.flush()
  print("Done! ({0})".format(command))







########################################################################
#
# PRODUCTION DEPLOYMENT
#
########################################################################
if(DEPLOYMENT_MODE=="PRODUCTION"):
    #
    # Ok, deploying production. There are a few things we need to do:
    #
    print_fancy_msg("Generating new configuration")

    #
    # First, we need to get the distribution's settings
    #
    print("generate_configuration() Reading cloudfront configuration from distribution id: " + CF_DISTRO)
    distribution_settings = cloudfront.get_distribution_config(Id=CF_DISTRO)

    if(distribution_settings == None):
        stop_build("Could not fetch cloudfront settings for distribution id: " + CF_DISTRO)
    origin_count = len(distribution_settings["DistributionConfig"]["Origins"]["Items"])
    print("generate_configuration() Current origin count: " + str(origin_count))

    print("\n\nORIGINAL:")
    #
    # Review Output for logging
    #
    print_config(distribution_settings)



    #
    # Now we need to download our templates and our backups file.
    #
    print("generate_configuration() Downloading config templates ...")
    build_log = load_json_s3("_reserved/_buildlog.json")
    backups_json = load_json_s3("_reserved/_backups.json")
    origin_template_json = load_json_s3("_reserved/_origin_config_template.json")
    origin_group_template_json = load_json_s3("_reserved/_origin_group_config_template.json")




    #
    # We have to check if they are all read, if not then halt deployment.
    #
    if(build_log == None or
    backups_json == None or
    origin_template_json == None or
    origin_group_template_json == None):
        stop_build("One or more template files could not be loaded from: " + S3_BUCKET)





    #
    # Now we generate a new origin id, and put that on the log.
    #
    print("generate_configuration() Generating new origins...")
    new_janis = generate_new_janis_object()
    NEW_BUILD_ID=new_janis["build_id"]
    print("generate_configuration() new_janis.build_id: " + new_janis["build_id"])
    print("generate_configuration() new_janis.timestamp: " + new_janis["timestamp"])
    write_janis_id(new_janis["build_id"])




    #
    # Now we need to create a folder for the build in S3 & Upload (sync)
    #
    s3.put_object(Bucket=S3_BUCKET, Key=(new_janis["build_id"]+'/'))
    # Then we sync to that folder
    print_fancy_msg("AWS Sync Method")
    print("Sync to AWS Bucket: " + S3_BUCKET)
    print("New Build location: " + NEW_BUILD_ID)
  run_command_live("aws s3 sync /app/janis/_dist s3://{0}/{1} --no-progress".format(S3_BUCKET, NEW_BUILD_ID))





    #
    # Update Build Log
    #
    # Filter out any entries older than 31 days (1 month)
    print("generate_configuration() Filter out old log entries...")
    for i in range(len(build_log['buildlog'])):
        today = datetime.datetime.now()
        date_time_obj = datetime.datetime.strptime(build_log['buildlog'][i]['timestamp'], "%Y-%m-%d %H-%M-%S")
        delta = today - date_time_obj
        if(delta.days >= 31):
            build_log['buildlog'].pop(i)

    # Now we update the log
    print("generate_configuration() Updating Build Log...")
    build_log["buildlog"].insert(0, new_janis) # Prepend build to json object
    write_json_s3(build_log, "_reserved/_buildlog.json")  # Update json in S3







    #
    # Let's Generate Origins
    #
    # First we add the newest build
    print("generate_configuration() Adding new build: " + new_janis["build_id"])
    new_item = origin_template_json.copy() # copy origin
    new_item["Id"] = new_janis["build_id"] #assign new values
    new_item["OriginPath"] = "/" + new_janis["build_id"]
    distribution_settings["DistributionConfig"]["Origins"]["Items"].append(new_item) # append
    # Append Backups
    for backup in backups_json['backups']:
        print("generate_configuration() Adding backup: " + backup)
        if(origin_exists(distribution_settings,backup) == True):
            print("generate_configuration() Skipping (already exists): " + backup)
        else:
            new_item = None
            new_item = origin_template_json.copy()
            new_item["Id"] = backup
            new_item["OriginPath"] = "/" + backup
            distribution_settings["DistributionConfig"]["Origins"]["Items"].append(new_item)
    # We need to update the Quantity field
    distribution_settings["DistributionConfig"]["Origins"]["Quantity"] \
        = len(distribution_settings["DistributionConfig"]["Origins"]["Items"])
    # Print for logging
    print_config(distribution_settings)
    # Apply changes
    update_cloudfront(distribution_settings)














    #
    # Now we update origin groups
    #
    # Regresh E-Tag
    distribution_settings = cloudfront.get_distribution_config(Id=CF_DISTRO)
    # Wipe out the items in origin group
    distribution_settings["DistributionConfig"]["OriginGroups"]["Items"][0]['Members']['Items'] = []

    # Append Current build
    distribution_settings["DistributionConfig"]["OriginGroups"]["Items"][0]['Members']['Items'].append({
        "OriginId": new_janis["build_id"]
    })
    # Append Backups
    backup = backups_json['backups'][0]
    print("generate_configuration() Adding backup to origin group: " + backup)
    distribution_settings["DistributionConfig"]["OriginGroups"]["Items"][0]['Members']['Items'].append({
        "OriginId": backup
    })
    # Update Item count
    distribution_settings["DistributionConfig"]["OriginGroups"]["Items"][0]['Members']['Quantity'] \
        = len(distribution_settings["DistributionConfig"]["OriginGroups"]["Items"][0]['Members']['Items'])
    # Print for logging
    print_config(distribution_settings)
    # Apply changes
    update_cloudfront(distribution_settings)










    #
    # Finally, we remove unused origin sources
    #
    # Refresh E-Tag
    distribution_settings = cloudfront.get_distribution_config(Id=CF_DISTRO)
    # First gather list of origin ids from the origin group (we need those)
    origins_to_remain = list(map(lambda x: x['OriginId'], \
        distribution_settings["DistributionConfig"]["OriginGroups"]["Items"][0]['Members']['Items']))
    # Now we remove all origins that aren't present in the origin group
    distribution_settings["DistributionConfig"]["Origins"]["Items"] = \
        [origin for origin in distribution_settings["DistributionConfig"]["Origins"]["Items"] \
        if origin['Id'] in origins_to_remain]
    # Now we update the quantity element
    distribution_settings["DistributionConfig"]["Origins"]["Quantity"] = \
        len(distribution_settings["DistributionConfig"]["Origins"]["Items"])
    # Now we print for logging
    print(json.dumps(distribution_settings))
    # Apply changes
    update_cloudfront(distribution_settings)


########################################################################
#
# STAGING DEPLOYMENT
#
########################################################################

if(DEPLOYMENT_MODE=="STAGING"):

    # For master/staging, all we need to do is to sync the build to bucket.
    print_fancy_msg("AWS Sync Method")
    print("Sync to AWS Bucket: " + S3_BUCKET)
    run_command_live("aws s3 sync /app/janis/_dist s3://{0}/ --delete --no-progress".format(S3_BUCKET))




