// Google Apps Script backend code
// This script handles form submissions and stores data in Google Sheets

// Global variables
const SHEET_NAME = "ConsentFormSubmissions";
const FOLDER_NAME = "ConsentFormSignatures";

/**
 * Function to handle OPTIONS preflight requests for CORS
 * @param {Object} e - Event object
 * @returns {Object} HTTP response with CORS headers
 */
function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "3600"
    });
}

/**
 * Main function to handle POST requests from the React frontend
 * @param {Object} e - The event object containing POST data
 * @returns {Object} HTTP response
 */
function doPost(e) {
  // Handle preflight OPTIONS request
  if (e.requestMethod === "OPTIONS") {
    return ContentService
      .createTextOutput("")
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "3600"
      });
  }
  
  try {
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Save data to Google Sheets
    const sheetResult = saveToSheet(data);
    
    // Save signature files to Google Drive (if any)
    const driveResult = saveSignaturesToDrive(data);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Data saved successfully",
        sheetResult: sheetResult,
        driveResult: driveResult
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
  } catch (error) {
    // Log error for debugging
    Logger.log("Error in doPost: " + error.toString());
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      });
  }
}

/**
 * Function to save form data to Google Sheets
 * @param {Object} data - The form data to save
 * @returns {Object} Result of the save operation
 */
function saveToSheet(data) {
  try {
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Get the headers from the first row
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // If no headers exist, create them
    if (headers.length === 0 || headers[0] === "") {
      const newHeaders = [
        "Timestamp",
        "Nama_NAKES",
        "JENIS_TINDAKAN",
        "NAMA PASIEN/WALI PASIEN",
        "ATTD NAKES A",
        "fhoto A",
        "ATTD NAMA PASIEN/WALI PASIEN B",
        "Fhoto B",
        "NAMA PASIEN/WALI PASIEN 1",
        "UMUR",
        "JENIS KELAMIN (1)",
        "ALAMAT (1)",
        "TINDAKAN (A)",
        "STATUS PASIEN (A)",
        "NAMA PASIEN 2",
        "UMUR (2)",
        "JENIS KELAMIN (2)",
        "ALAMAT (2)",
        "TTD PASIEN 1",
        "fhoto P1",
        "TTD NAKES 1",
        "fhoto N1",
        "TTD WALI PASIEN/SAKSI 2",
        "fhoto P2",
        "NAMA PASIEN/WALI PASIEN 3",
        "UMUR (3)",
        "JENIS KELAMIN (A)",
        "ALAMAT (3)",
        "TINDAKAN (B)",
        "STATUS PASIEN (B)",
        "NAMA PASIEN 4",
        "UMUR (4)",
        "JENIS KELAMIN (B)",
        "TANGGAL (A)",
        "TTD PASIEN 3",
        "fhoto P3",
        "TTD NAKES 2",
        "fhoto N2",
        "TTD WALI PASIEN/SAKSI 4",
        "Fhoto P4",
        "TANGGAL (1)",
        "PUKUL (1)",
        "ALAMAT (4)",
        "PUKUL (B)",
        "email"
      ];
      sheet.getRange(1, 1, 1, newHeaders.length).setValues([newHeaders]);
    }
    
    // Prepare data row based on the new structure
    const rowData = [
      new Date(), // Timestamp
      data.medicalStaffName, // Nama_NAKES
      data.procedureType, // JENIS_TINDAKAN
      data.patientName, // NAMA PASIEN/WALI PASIEN
      data.medicalStaffSignatureType === "draw" ? "Gambar" : "Upload", // ATTD NAKES A
      data.medicalStaffSignatureType === "draw" ? "Gambar" : "Upload", // fhoto A
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // ATTD NAMA PASIEN/WALI PASIEN B
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // Fhoto B
      data.patientFullName, // NAMA PASIEN/WALI PASIEN 1
      data.patientAge, // UMUR
      data.patientGender, // JENIS KELAMIN (1)
      data.patientAddress, // ALAMAT (1)
      data.procedureType, // TINDAKAN (A)
      "Pasien", // STATUS PASIEN (A)
      data.patientFullName, // NAMA PASIEN 2
      data.patientAge, // UMUR (2)
      data.patientGender, // JENIS KELAMIN (2)
      data.patientAddress, // ALAMAT (2)
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // TTD PASIEN 1
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // fhoto P1
      data.medicalStaffSignatureType === "draw" ? "Gambar" : "Upload", // TTD NAKES 1
      data.medicalStaffSignatureType === "draw" ? "Gambar" : "Upload", // fhoto N1
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // TTD WALI PASIEN/SAKSI 2
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // fhoto P2
      data.patientFullName, // NAMA PASIEN/WALI PASIEN 3
      data.patientAge, // UMUR (3)
      data.patientGender, // JENIS KELAMIN (A)
      data.patientAddress, // ALAMAT (3)
      data.procedureType, // TINDAKAN (B)
      "Pasien", // STATUS PASIEN (B)
      data.patientFullName, // NAMA PASIEN 4
      data.patientAge, // UMUR (4)
      data.patientGender, // JENIS KELAMIN (B)
      data.patientDate, // TANGGAL (A)
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // TTD PASIEN 3
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // fhoto P3
      data.medicalStaffSignatureType === "draw" ? "Gambar" : "Upload", // TTD NAKES 2
      data.medicalStaffSignatureType === "draw" ? "Gambar" : "Upload", // fhoto N2
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // TTD WALI PASIEN/SAKSI 4
      data.patientSignatureType === "draw" ? "Gambar" : "Upload", // Fhoto P4
      data.patientDate, // TANGGAL (1)
      "", // PUKUL (1) - Not collected in form
      data.patientAddress, // ALAMAT (4)
      "", // PUKUL (B) - Not collected in form
      data.email // email
    ];
    
    // Append data to sheet
    sheet.appendRow(rowData);
    
    return {
      status: "success",
      row: sheet.getLastRow()
    };
  } catch (error) {
    Logger.log("Error in saveToSheet: " + error.toString());
    return {
      status: "error",
      message: error.toString()
    };
  }
}

/**
 * Function to save signature files to Google Drive
 * @param {Object} data - The form data containing signature information
 * @returns {Object} Result of the save operation
 */
function saveSignaturesToDrive(data) {
  try {
    // Get or create the folder for signatures
    const folder = getOrCreateFolder();
    
    // Array to store file information
    const savedFiles = [];
    
    // Save medical staff signature if it's base64 data
    if (data.medicalStaffSignatureType === "draw" && data.medicalStaffSignatureData) {
      const medicalStaffFileName = `medical_staff_${Date.now()}.png`;
      const medicalStaffFile = saveBase64ToFile(
        data.medicalStaffSignatureData, 
        medicalStaffFileName, 
        folder
      );
      savedFiles.push({
        type: "medical_staff",
        name: medicalStaffFileName,
        url: medicalStaffFile.getUrl()
      });
    }
    
    // Save patient signature if it's base64 data
    if (data.patientSignatureType === "draw" && data.patientSignatureData) {
      const patientFileName = `patient_${Date.now()}.png`;
      const patientFile = saveBase64ToFile(
        data.patientSignatureData, 
        patientFileName, 
        folder
      );
      savedFiles.push({
        type: "patient",
        name: patientFileName,
        url: patientFile.getUrl()
      });
    }
    
    return {
      status: "success",
      files: savedFiles,
      folderUrl: folder.getUrl()
    };
  } catch (error) {
    Logger.log("Error in saveSignaturesToDrive: " + error.toString());
    return {
      status: "error",
      message: error.toString()
    };
  }
}

/**
 * Helper function to get or create the Google Sheet
 * @returns {Object} Google Sheet object
 */
function getOrCreateSheet() {
  const sheets = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = sheets.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = sheets.insertSheet(SHEET_NAME);
  }
  
  return sheet;
}

/**
 * Helper function to get or create the Google Drive folder
 * @returns {Object} Google Drive folder object
 */
function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  
  let folder;
  if (folders.hasNext()) {
    folder = folders.next();
  } else {
    folder = DriveApp.createFolder(FOLDER_NAME);
  }
  
  return folder;
}

/**
 * Helper function to save base64 data as a file in Google Drive
 * @param {string} base64Data - The base64 encoded data
 * @param {string} fileName - The name for the file
 * @param {Object} folder - The Google Drive folder to save to
 * @returns {Object} The created file
 */
function saveBase64ToFile(base64Data, fileName, folder) {
  // Remove the data URL prefix if present
  const base64Content = base64Data.replace(/^data:image\/(png|jpeg);base64,/, "");
  
  // Convert base64 to blob
  const decodedData = Utilities.base64Decode(base64Content);
  const blob = Utilities.newBlob(decodedData, "image/png", fileName);
  
  // Save to folder
  return folder.createFile(blob);
}

/**
 * Function to handle preflight OPTIONS requests for CORS
 * @param {Object} e - Event object
 * @returns {Object} HTTP response with CORS headers
 */
function doOptions(e) {
  return ContentService
    .createTextOutput("")
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Max-Age": "3600"
    });
}

/**
 * Function for testing (not for production)
 * @param {Object} e - Event object
 * @returns {Object} HTTP response
 */
function doGet(e) {
  return ContentService
    .createTextOutput("Google Apps Script backend for Consent Form is running")
    .setMimeType(ContentService.MimeType.TEXT)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    });
}