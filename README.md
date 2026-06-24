Added following script in the package.json file for future muiltiple user types, and env support:
{
  "scripts": {
    "test:owner": "cross-env USER_TYPE=owner playwright test",
    "test:manager": "cross-env USER_TYPE=manager playwright test",
    "test:customer": "cross-env USER_TYPE=customer playwright test"
  }
}
//Use following command to run the test:
//Owner
$env:ENV="uat"
npm run test:owner -- --project=chromium --workers=1
//Manager
$env:ENV="uat"
npm run test:manager -- --project=chromium --workers=1
//Customer
$env:ENV="qa"
npm run test:customer -- --project=chromium --workers=1

You can also make it even cleaner:
Update the script to following:
{
  "scripts": {
    "test:owner": "cross-env USER_TYPE=owner playwright test --project=chromium --workers=1",
    "test:manager": "cross-env USER_TYPE=manager playwright test --project=chromium --workers=1",
    "test:customer": "cross-env USER_TYPE=customer playwright test --project=chromium --workers=1"
  }
}

Then simply run:
$env:ENV="uat"
npm run test:owner

//For headed mode, simply pass the --headed flag after the npm script.
npm run test:owner -- --project=chromium --workers=1 --headed

//If you're also setting the environment in PowerShell:
$env:ENV="uat"
npm run test:owner -- --project=chromium --workers=1 --headed
