# a quick starter app for angular material demo app
A quicker starter demo app using Angular Material for IBM Bluemix.

#Overview

Provide a starter app where one can modify from and deploy to Bluemix.

## Application Requirements
You can use this app in  browser.

## Run the app on Bluemix
You can deploy your own instance of demo app to Bluemix. 
To do this, you can either use the _Deploy to Bluemix_ button for an automated deployment or follow the steps below to create and deploy your app manually.

[![Deploy to Bluemix](https://bluemix.net/deploy/button.png)](https://bluemix.net/deploy?repository=https://github.com/jaricsng/ngStarterApp.git)


1. Create a Bluemix Account.

    [Sign up][bluemix_signup_url] for Bluemix, or use an existing account.

2. Download and install the [Cloud-foundry CLI][cloud_foundry_url] tool.

3. Clone the app to your local environment from your terminal using the following command:

  ```
  git clone https://github.com/jaricsng/ngStarterApp.git
  ```

4. `cd` into this newly created directory.

5. Edit the `manifest.yml` file and change the `<name>` and `<host>` to something unique.

  ```
applications:
- disk_quota: 1024M
  name: ngStarterApp-demo
  host: ngStarterApp-demo
  command: node app.js
  path: .
  domain: mybluemix.net
  instances: 1
  memory: 512M
  ```
  The host you use will determinate your application URL initially, for example, `<host>.mybluemix.net`.

6. Connect to Bluemix in the command line tool and follow the prompts to log in:

  ```
  $ cf api https://api.ng.bluemix.net
  $ cf login
  ```

7. Finally, start your app. You can also do this from the Bluemix dashboard. **Note**: The name *ngStarterApp-demo* must be updated to reflect the name that you chose in step 5.

  ```
  $ cf start ngStarterApp-demo
  ```

Congratulations! You now have your very own instance of the Angular Material starter app demo running on Bluemix. Try it out at `https://<host>.mybluemix.net`, where `host` is the value that you set in your `manifest.yml` file.

## Run the app locally
1. If don't have node.js already, [download node.js][download_node_url] and install it on your local machine.

3. Clone the app to your local environment from your terminal using the following command:

  ```
  git https://github.com/jaricsng/ngStarterApp.git
  ```

4. `cd` into this newly created directory.

5. Install the required npm and bower packages using the following command:

  ```
  npm install
  ```

6. Start your app locally with the following command:

  ```
  node app
  ```

Your app will be automatically assigned to a port that will be logged to your terminal. For example, you might see the following:
  ```
  server starting on http://localhost:6001
   ```
   
## Contribute
We are happy to accept external contributions to this project, either in the form of issues or pull requests. 
If you find a bug, please report it using the [Issues section](https://github.com/jaricsng/ngStarterApp/issues) or even better, fork the project and submit a pull request with your fix! 
Pull requests will be evaluated on an individual basis based on value added to the sample application.

## Troubleshooting

The primary source of debugging information for your Bluemix app is the logs. To see them, run the following command using the Cloud Foundry CLI:

  ```
  $ cf logs <application-name> --recent
  ```
For more detailed information on troubleshooting your application, see the [Troubleshooting section](https://www.ng.bluemix.net/docs/troubleshoot/tr.html) in the Bluemix documentation.

### Useful links
[Material Design](https://stories.uplabs.com/tagged/material-design)

[Angular Material](https://material.angularjs.org/latest/)

[AngularJS](https://angularjs.org/)

[Angular ui-router](https://angular-ui.github.io/ui-router/site/#/api/ui.router)

[Material Icons](http://google.github.io/material-design-icons/)

[IBM Bluemix](https://bluemix.net/)  
[IBM  Bluemix Documentation](https://www.ng.bluemix.net/docs/)  
[IBM Bluemix Developers Community](http://developer.ibm.com/bluemix)

[bluemix_signup_url](https://console.ng.bluemix.net/registration/)

[cloud_foundry_url](https://github.com/cloudfoundry/cli)

[download_node_url](https://nodejs.org/download/)

