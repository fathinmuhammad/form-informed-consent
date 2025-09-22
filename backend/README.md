# Google Apps Script Backend Setup

This document explains how to set up the Google Apps Script backend for the Consent Form application.

## Prerequisites

1. A Google account
2. Access to Google Sheets and Google Drive

## Setup Instructions

### 1. Create a new Google Apps Script project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click on "New Project"
3. Remove the default `myFunction` code
4. Copy and paste the contents of `Code.js` from this repository into the script editor
5. Save the project with a name like "ConsentFormBackend"

### 2. Deploy the script as a web app

1. Click on "Deploy" → "New deployment"
2. Click the gear icon and select "Web app"
3. Configure the deployment settings:
   - Description: Consent Form Backend
   - Execute as: Me (your email)
   - Who has access: Anyone (or "Anyone even anonymous" for testing)
4. Click "Deploy"
5. Copy the Web app URL - you'll need this for the frontend

### 3. Configure the frontend

1. In your React application, locate the `ConsentForm.jsx` component
2. Find the `onSubmit` function
3. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL'` with the Web app URL you copied in step 2.5

### 4. Testing the backend

1. Submit a form in your React application
2. Check your Google Drive for a folder named "ConsentFormSignatures"
3. Check your Google Sheets for a spreadsheet with the form data

## How it works

The backend consists of a single `doPost` function that:

1. Receives JSON data from the React frontend
2. Parses the data
3. Saves the form data to a Google Sheet
4. Saves any signature images to Google Drive
5. Returns a JSON response to the frontend

## Security considerations

For production use, you should:

1. Restrict access to "Only myself" instead of "Anyone"
2. Implement proper authentication
3. Add rate limiting
4. Validate and sanitize all input data