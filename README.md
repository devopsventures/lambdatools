# lambdatools

This is a set of utilities to assist in building AWS Lambda functions for deployment to AWS.
It is a Node.js application bundle that provides a number of utility sub commands to make it easier to work with 
building Lambda code bundles.

## Installation

```bash
$ npm install -g @devopsventures/lambdatools
```


## Commands

### zip
The zip command will zip up a specified directory, excluding any files as per the exclusion template so that it can used
as a deployment bundle for an AWS Lambda.


#### Examples

Zip up the current working directory using the default (Node.js exclusion template).
```bash
lambdatools zip .
```
The above command will create a zip file of the name of the current working directory in the current working directory.
For example if the current working directory was `/tmp/my-lambda`, then the zip file created would be `/tmp/my-lambda/my-lambda.zip`.
