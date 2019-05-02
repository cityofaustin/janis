### Janis Worker

Required Environment Variables


#### Local Development

Build Locally, be sure to run the build command outside of the worker directory, the Dockerfile needs the source code in janis, as well as the files in the worker directory to build the worker.

```bash

# Re-Build:
docker build -f worker/Dockerfile -t cityofaustin/janis-worker:latest .

# Re-Build:
docker build --no-cache -f worker/Dockerfile -t cityofaustin/janis-worker:latest .

docker  run -it --rm --name "janis-worker" \
		--env DEPLOYMENT_MODE="PRODUCTION" \
		--env GOOGLE_ANALYTICS="<google analytics tag here>" \
		--env FEEDBACK_API="https://coa-test-form-api.herokuapp.com/process/" \
		--env CMS_API="https://joplin.herokuapp.com/api/graphql" \
		--env CMS_MEDIA="https://joplin-austin-gov.s3.amazonaws.com/media" \
		--env JANIS_REPO="https://github.com/cityofaustin/janis" \
		--env AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
		--env AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
		--env AWS_DEFAULT_REGION=$AWS_DEFAULT_REGION \
		--env AWS_BUCKET_NAME="<the bucket name here>" \
		--env AWS_CF_DISTRO="<the distro id here: E455RV7LE5UVG>" \
		cityofaustin/janis-worker


```

#### Deploy to AWS

Build and push to AWS:

```bash
$(aws ecr get-login --no-include-email --region "us-east-1")

docker build --no-cache -f worker/Dockerfile -t cityofaustin/janis-worker:latest .

docker tag cityofaustin/janis-worker:latest <Amazon ECR repo url here>/cityofaustin/janis-worker:latest

docker push <Amazon ECR repo url here>/cityofaustin/janis-worker:latest
```


Trigger a build from Python/Joplin. Note: Some options, such as credentials, can also be read from environment variables (e.g. AWS_ACCESS_KEY_ID , AWS_SECRET_ACCESS_KEY , AWS_SECURITY_TOKEN and AWS_PROFILE ).


```python

import boto3

#
# You may instead decide to privide AWS credentials to the client directly:
#
# client = boto3.client(
#     'ecs',
#     aws_access_key_id=ACCESS_KEY,
#     aws_secret_access_key=SECRET_KEY,
#     aws_session_token=SESSION_TOKEN,
# )
#

#
# Read keys from environment vars
#
client = boto3.client('ecs')


response = client.run_task(
    cluster='janis-cluster',
    taskDefinition='janis-worker:<task version here>',
    launchType='FARGATE',
    count=1,
    platformVersion='LATEST',
    networkConfiguration={
        'awsvpcConfiguration': {
            'subnets': ['<subnet id here>'],
            'assignPublicIp': 'ENABLED',
            'securityGroups': ['<security group here>'],
        },
    },
    overrides={
        'containerOverrides': [
            {
                'name': 'janis-worker',
                'environment': [
                    {
                        'name': 'DEPLOYMENT_MODE',
                        'value': 'PRODUCTION'
                    },
                    {
                        'name': 'AWS_BUCKET_NAME',
                        'value': '<bucket name here>'
                    },
                    {
                        'name': 'AWS_CF_DISTRO',
                        'value': '<distro id here>'
                    }
                ]
            }
        ]
    }
)

#
# Outputs a bunch of json data:
#
print(response)
```
