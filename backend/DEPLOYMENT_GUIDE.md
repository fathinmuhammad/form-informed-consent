# Deployment Guide: Google Apps Script Backend

This guide explains how to deploy the Google Apps Script backend for the Consent Form application.

## Prerequisites

1. A Google account
2. Access to Google Sheets and Google Drive

## Deployment Steps

### 1. Create a new Google Apps Script project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click on "New Project"
3. Remove the default `myFunction` code
4. Copy and paste the contents of `Code.js` from this repository into the script editor
5. Save the project with a name like "ConsentFormBackend"

### 2. Configure the project

1. In the script editor, click on the gear icon (Project Settings)
2. Check "Show "appsscript.json" manifest file in editor"
3. Update the `appsscript.json` file with the following content:
   ```json
   {
     "timeZone": "Asia/Jakarta",
     "dependencies": {
       "enabledAdvancedServices": []
     },
     "exceptionLogging": "STACKDRIVER",
     "runtimeVersion": "V8"
   }
   ```

### 3. Deploy the script as a web app

1. Click on "Deploy" → "New deployment"
2. Click the gear icon and select "Web app"
3. Configure the deployment settings:
   - Description: Consent Form Backend
   - Execute as: Me (your email)
   - Who has access: 
     - For testing: "Anyone even anonymous"
     - For production: "Only myself" or "Anyone within [your domain]"
4. Click "Deploy"
5. You may need to review permissions - click "Review Permissions" and authorize the app
6. Copy the Web app URL - you'll need this for the frontend

### 4. Configure the frontend

1. In your React application, locate the `ConsentForm.js` component
2. Find the `onSubmit` function
3. Replace the URL in the fetch request with the Web app URL you copied in step 3.6

### 5. Testing the backend

1. Submit a form in your React application
2. Check your Google Drive for a folder named "ConsentFormSignatures"
3. Check your Google Sheets for a spreadsheet with the form data

## Updating the Deployment

If you make changes to the Google Apps Script code:

1. Save your changes in the script editor
2. Click "Deploy" → "Manage deployments"
3. Click the edit icon (pencil) next to your deployment
4. Under "Version", select "New version"
5. Click "Deploy"
6. The URL remains the same, but the code is updated

## Troubleshooting

### "You do not have permission" error

1. Make sure you've authorized the app when deploying
2. Check that the "Execute as" setting is correct
3. Verify the "Who has access" setting matches your needs

### Data not saving to Sheets

1. Check the script logs in Google Apps Script (View → Logs)
2. Ensure you have access to create and edit Google Sheets
3. Verify the sheet name constant in the code matches your requirements

### Files not saving to Drive

1. Check that you have access to create folders and files in Google Drive
2. Verify the folder name constant in the code
3. Check the script logs for any errors

## Security Considerations

For production use:

1. Restrict access to "Only myself" instead of "Anyone"
2. Implement proper authentication
3. Add rate limiting
4. Validate and sanitize all input data
5. Consider using Google Cloud projects for better control and monitoring

## Monitoring

1. Use "View → Logs" in Google Apps Script to monitor execution
2. Set up Google Cloud monitoring if using a Cloud project
3. Regularly check the Google Sheets and Drive folders for proper data storage