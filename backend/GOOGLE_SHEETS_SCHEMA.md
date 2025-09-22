# Google Sheets Database Structure

This document describes the structure of the Google Sheets database that will store the consent form submissions.

## Sheet Name: ConsentFormSubmissions

The Google Sheets document will have a single sheet named "ConsentFormSubmissions" with the following columns:

| Column | Field Name | Description |
|--------|------------|-------------|
| A | Timestamp | Date and time when the form was submitted |
| B | Nama_NAKES | Name of the medical staff |
| C | JENIS_TINDAKAN | Type of medical procedure |
| D | NAMA PASIEN/WALI PASIEN | Name of the patient or guardian |
| E | ATTD NAKES A | Signature method for medical staff ("Gambar" or "Upload") |
| F | fhoto A | Signature method for medical staff ("Gambar" or "Upload") |
| G | ATTD NAMA PASIEN/WALI PASIEN B | Signature method for patient/guardian ("Gambar" or "Upload") |
| H | Fhoto B | Signature method for patient/guardian ("Gambar" or "Upload") |
| I | NAMA PASIEN/WALI PASIEN 1 | Full name of the patient |
| J | UMUR | Age of the patient |
| K | JENIS KELAMIN (1) | Gender of the patient |
| L | ALAMAT (1) | Address of the patient |
| M | TINDAKAN (A) | Type of medical procedure |
| N | STATUS PASIEN (A) | Status ("Pasien") |
| O | NAMA PASIEN 2 | Full name of the patient |
| P | UMUR (2) | Age of the patient |
| Q | JENIS KELAMIN (2) | Gender of the patient |
| R | ALAMAT (2) | Address of the patient |
| S | TTD PASIEN 1 | Signature method for patient ("Gambar" or "Upload") |
| T | fhoto P1 | Signature method for patient ("Gambar" or "Upload") |
| U | TTD NAKES 1 | Signature method for medical staff ("Gambar" or "Upload") |
| V | fhoto N1 | Signature method for medical staff ("Gambar" or "Upload") |
| W | TTD WALI PASIEN/SAKSI 2 | Signature method for patient/guardian ("Gambar" or "Upload") |
| X | fhoto P2 | Signature method for patient/guardian ("Gambar" or "Upload") |
| Y | NAMA PASIEN/WALI PASIEN 3 | Full name of the patient |
| Z | UMUR (3) | Age of the patient |
| AA | JENIS KELAMIN (A) | Gender of the patient |
| AB | ALAMAT (3) | Address of the patient |
| AC | TINDAKAN (B) | Type of medical procedure |
| AD | STATUS PASIEN (B) | Status ("Pasien") |
| AE | NAMA PASIEN 4 | Full name of the patient |
| AF | UMUR (4) | Age of the patient |
| AG | JENIS KELAMIN (B) | Gender of the patient |
| AH | TANGGAL (A) | Date entered by the patient |
| AI | TTD PASIEN 3 | Signature method for patient ("Gambar" or "Upload") |
| AJ | fhoto P3 | Signature method for patient ("Gambar" or "Upload") |
| AK | TTD NAKES 2 | Signature method for medical staff ("Gambar" or "Upload") |
| AL | fhoto N2 | Signature method for medical staff ("Gambar" or "Upload") |
| AM | TTD WALI PASIEN/SAKSI 4 | Signature method for patient/guardian ("Gambar" or "Upload") |
| AN | Fhoto P4 | Signature method for patient/guardian ("Gambar" or "Upload") |
| AO | TANGGAL (1) | Date entered by the patient |
| AP | PUKUL (1) | Time (not collected in form) |
| AQ | ALAMAT (4) | Address of the patient |
| AR | PUKUL (B) | Time (not collected in form) |
| AS | email | Email address for confirmation |

## Signature Storage

Signatures drawn on the canvas will be saved as PNG files in a Google Drive folder named "ConsentFormSignatures". The filenames will be in the format:
- Medical staff signatures: `medical_staff_{timestamp}.png`
- Patient signatures: `patient_{timestamp}.png`

Uploaded signature files will be stored in the same Google Drive folder with their original filenames.