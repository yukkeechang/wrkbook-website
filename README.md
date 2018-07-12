# WrkBook Website
---------------
A web-application that is designed to connect workers and contractors together.
===============================
This project is using the following:

* Meteor.js for the backend
* React.js, Materialize.css for the frontend
* mocha, chai, and enzyme for testing

## How to get started
1. clone the repo
2. create a `settings-development.json` with valid public and private api keys received from one of the core members from Stripe in parent folder. The format of the file should be: {"public":{"stripe":"public_api_key"},"private":{"stripe":"private_api_key"}}
3. run `npm install`
  * should install all necessary dependences for the project
4. run `npm start`
  * will build the meteor project, the web app should be hosted on localhost:3000

## Running Tests
There are currently two ways to run test for the project

<i> This is assuming you went through all the steps in </i><b>How to get started</b>
### To run a purely command prompt report
1. run `npm test`
  * will run all the test files  with the suffix .test.js
  * this will run through all the test files and print out any failures and then exit
  * <b> THIS WHAT CIRCLECI RUNS WHEN IT CHECK FOR ERRORS </b>

### To run a browser reporting test
1. run `npm run always`
  * will run all the test files  with the suffix .test.js
  * will display its results on the page localhost:5000
  * this will rerun once you edit  and save any files within the project

## To Generate the Documents for the project
To create the Documentation for this project
1. run ` npm run make-docs ` in the parent folder
2. Documentation will be generated in the folder `docs/` same level as `wrkbook-website/`
  * all files are static html files
