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
    # Append line to stdout
    stdout.append(line)
    # Decode from byte array to utf and remove line breaks
    cleanline = line.decode('utf-8').rstrip("\r\n")
    print(cleanline)

    if cleanline == '' and p.poll() != None:
      break

  print("Done! ({0})".format(command))


#
# Bucket rotation has been removed from this branch.
#


# For master/staging, all we need to do is to sync the build to bucket.
print_fancy_msg("AWS Sync Method")
print("Sync to AWS Bucket: " + S3_BUCKET)
run_command_live("aws s3 sync /app/janis/_dist s3://{0}/ --no-progress".format(S3_BUCKET))




