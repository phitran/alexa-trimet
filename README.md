# Alexa Trimet Skill - work in progress
Amazon Echo Skills app that returns TriMet information

## SETUP

###Install Dependencies
```npm Install```

###Envormienal Variables - needed for Gulp tasks (build, deploy)
* ```ALEXA_APP_ID``` - Amazon Alexa app id
* ```TRIMET_APP_ID``` - Trimet API key
* ```AWS_DYNAMO_SECRET``` - AWS Dynamo User access ID
* ```AWS_DYNAMO_KEY``` - AWS Dynamo User access key
* ```IS_DEV``` - set to ```true``` if dev mode

## Build/Test
Run ```gulp run``` to mock AWS Lambda request

## Package for AWS Lambda Function upload
Run ```gulp package```
