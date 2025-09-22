import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectItem } from '../ui/select';
import SignatureCanvas from './SignatureCanvas';
import FileUpload from './FileUpload';

// Schema validation for each step
const step1Schema = z.object({
  medicalStaffName: z.string().min(1, "Nama tenaga kesehatan harus dipilih"),
  procedureType: z.string().min(1, "Jenis tindakan harus dipilih"),
  patientName: z.string().min(1, "Nama pasien/wali harus diisi"),
  medicalStaffSignatureType: z.enum(["draw", "upload"]),
  patientSignatureType: z.enum(["draw", "upload"]),
  medicalStaffSignatureData: z.any().nullable(),
  patientSignatureData: z.any().nullable(),
});

const step2Schema = z.object({
  patientFullName: z.string().min(1, "Nama lengkap pasien harus diisi"),
  patientAge: z.number().min(1, "Umur pasien harus diisi").max(150, "Umur tidak valid").nullable(),
  patientGender: z.string().min(1, "Jenis kelamin pasien harus dipilih"),
  patientAddress: z.string().min(1, "Alamat pasien harus diisi"),
  patientDate: z.string().min(1, "Tanggal harus diisi"),
  guardianFullName: z.string().optional(),
  guardianAge: z.number().optional().nullable(),
  guardianGender: z.string().optional(),
  guardianAddress: z.string().optional(),
  guardianDate: z.string().optional(),
});

const step3Schema = z.object({
  email: z.string().email("Email tidak valid")
});

// Combined schema for final submission
const formSchema = z.object({
  // Step 1
  medicalStaffName: z.string().min(1, "Nama tenaga kesehatan harus dipilih"),
  procedureType: z.string().min(1, "Jenis tindakan harus dipilih"),
  patientName: z.string().min(1, "Nama pasien/wali harus diisi"),
  medicalStaffSignatureType: z.enum(["draw", "upload"]),
  patientSignatureType: z.enum(["draw", "upload"]),
  medicalStaffSignatureData: z.any().nullable(),
  patientSignatureData: z.any().nullable(),
  
  // Step 2
  patientFullName: z.string().min(1, "Nama lengkap pasien harus diisi"),
  patientAge: z.number().min(1, "Umur pasien harus diisi").max(150, "Umur tidak valid").nullable(),
  patientGender: z.string().min(1, "Jenis kelamin pasien harus dipilih"),
  patientAddress: z.string().min(1, "Alamat pasien harus diisi"),
  patientDate: z.string().min(1, "Tanggal harus diisi"),
  guardianFullName: z.string().optional(),
  guardianAge: z.number().optional().nullable(),
  guardianGender: z.string().optional(),
  guardianAddress: z.string().optional(),
  guardianDate: z.string().optional(),
  
  // Step 3
  email: z.string().email("Email tidak valid")
});

const medicalStaffOptions = [
  "Dr. M. ALWAN AMIRUDDIN TAMARA",
  "SRI ENDAH WAHYUNINGSIH, S.K.M",
  "Dr. IWAN DARMAWAN",
  "Dr. IRENE REGINA ARDIS",
  "Drg. RULYTA AYU MAULIDA",
  "Ns. ERYTHRINA JULIANTI, S.Kep",
  "KUSMIYATI, Amd.Kep",
  "SARAH MUTIA, A.Md.Kep",
  "MUHAMMAD RIFKY AULIA, A.Md.Kep",
  "WAHYU KURNIAWAN, A.Md.Kep",
  "DANI ASTUTI,S.Tr.Keb",
  "AFRIDA ARDIANTI, A.Md.Keb",
  "RINA RAHAYU, A.Md.Keb",
  "INTAN ARDITHA,A.Md.Keb",
  "FITRIAH EKA PUTRI,A.Md.Keb",
  "WULIDA FANUM, S.Tr.Keb.,Bdn",
  "MUHAMMAD FAISAL,S.Farm.,Apt.",
  "MUHAMAD FAJAR SAPUTRO, S.Farm",
  "DELLA ANDINA SULADIAH, SKM.",
  "FAUZIYAH,S.Gz",
  "DIAN ISNAINI ARIFIANTI, S.Gz",
  "YUNI PURWATMI, A.Md.Kes",
  "ANISA HAFRIDHA PUTRI, A.Md.Kes",
  "SEPTY TRY FEBRIANY, S.ST",
  "Drg. MUHAMMAD FAISAL MUSLIM",
  "ZAIDATI KHARIJAH, A.Md.Kes",
  "ARIFAH HANDAYANI, A.Md.Kep",
  "RANA YUSRIA, A.Md.Keb",
  "SANTY SOFFARIYAH KUSNADI, A.M.Keb",
  "UUN KUMALASARI, A.Md.Keb",
  "dr. NASYA WIDIYANA",
  "dr. SWASTIKA TERSIANA WILIANTI",
  "dr. SALMA ABDUL WADUD KASYFUL ANWAR",
  "dr. DUHITA HAJUNINGTYAS, M.K.M",
  "dr. MAYA NOVIKA RANGKUTI",
  "DINA MELINA SAMOSIR, A.Md.Farm",
  "DEVI KARTIKA, S.K.M",
  "SUCI MAULIDYA PARAMITHA SUARDI, S.K.M",
  "DYAH PERMANASARI, S.Gz",
  "LESIKA PRIANTI, A.Md.AK",
  "Ns. DEVIANA NARTATIK, S.Kep"
];

const procedureTypeOptions = [
  "HECTING (IGD)",
  "PERAWATAN LUKA (IGD)",
  "KB 3 BULAN (KB)",
  "IUD (KB)",
  "CABUT GIGI (BPG)",
  "PEMBERSIHAN KARANG GIGI / SCALLING (BPG)",
  "PENAMBALAN GIGI (BPG)",
  "IMPLANT (KB)",
  "PEMERIKSAAN KEHAMILAN (KIA)",
  "VAKSINASI (KIA)",
  "INFUS (IGD)",
  "NGT (IGD)",
  "Catheter (IGD)",
  "Suction (IGD)",
  "EKG (IGD)",
  "USG (KIA)",
  "SUNTIK KB (KB)",
  "Pemasangan IUD (KB)",
  "Pemeriksaan Gigi Rutin (BPG)",
  "Pencabutan Sarang Gigi (BPG)",
  "Tambal Gigi Depan (BPG)",
  "Tambal Gigi Belakang (BPG)",
  "Pemutihan Gigi (BPG)",
  "Veneer Gigi (BPG)",
  "Mahkota Gigi (BPG)",
  "Bridge Gigi (BPG)",
  "Implant Gigi (BPG)",
  "Pemeriksaan Umum (IGD)",
  "Rontgen Gigi (BPG)",
  "Rontgen Thorax (IGD)",
  "Rontgen Abdomen (IGD)",
  "CT Scan (IGD)",
  "MRI (IGD)",
  "Laboratorium Darah (IGD)",
  "Laboratorium Urine (IGD)",
  "Laboratorium Feses (IGD)",
  "Pemeriksaan THT (THT)",
  "Pemeriksaan Mata (MATA)",
  "Pemeriksaan Kulit (KULIT)",
  "Pemeriksaan Jantung (JANTUNG)",
  "Pemeriksaan Paru (PARU)",
  "Pemeriksaan Saraf (SARAF)",
  "Pemeriksaan Tulang (ORTO)",
  "Pemeriksaan Anak (ANAK)",
  "Pemeriksaan Kandungan (KANDUNGAN)",
  "Persalinan Normal (KANDUNGAN)",
  "Operasi Caesar (KANDUNGAN)",
  "Rawat Inap (RI)",
  "Rawat Jalan (RJ)",
  "IGD 24 Jam (IGD)",
  "Farmasi (FARMASI)",
  "Rehabilitasi Medik (REHAB)",
  "Fisioterapi (REHAB)",
  "Okupasi Terapi (REHAB)",
  "Terapi Wicara (REHAB)",
  "Nutrisi dan Dietetik (GIZI)",
  "Konseling Psikolog (PSIKOLOG)",
  "Konseling Gizi (GIZI)",
  "Konseling Kebidanan (BIDAN)",
  "Konseling Keperawatan (PERAWAT)",
  "Konseling Farmasi (APOTEKER)",
  "Konseling Kesehatan Gigi (DOKTER GIGI)",
  "Konseling Kesehatan Umum (DOKTER UMUM)",
  "Konseling Kesehatan Ibu dan Anak (BIDAN)",
  "Konseling Kesehatan Lansia (DOKTER UMUM)",
  "Konseling Kesehatan Remaja (DOKTER UMUM)",
  "Konseling Kesehatan Pra Usia Sekolah (DOKTER UMUM)",
  "Konseling Kesehatan Usia Sekolah (DOKTER UMUM)",
  "Konseling Kesehatan Balita (BIDAN)",
  "Konseling Kesehatan Neonatus (BIDAN)",
  "Konseling Kesehatan Bayi (BIDAN)",
  "Konseling Kesehatan Toddler (BIDAN)",
  "Konseling Kesehatan Preschooler (BIDAN)",
  "Konseling Kesehatan School Age (DOKTER UMUM)",
  "Konseling Kesehatan Adolescent (DOKTER UMUM)",
  "Konseling Kesehatan Young Adult (DOKTER UMUM)",
  "Konseling Kesehatan Middle Age (DOKTER UMUM)",
  "Konseling Kesehatan Elderly (DOKTER UMUM)",
  "Konseling Kesehatan Geriatri (DOKTER UMUM)"
];

const genderOptions = [
  "Laki-laki",
  "Perempuan"
];

export default function ConsentForm() {
  const [step, setStep] = useState(1);
  const [medicalStaffSignatureFile, setMedicalStaffSignatureFile] = useState(null);
  const [patientSignatureFile, setPatientSignatureFile] = useState(null);
  const [medicalStaffSignatureData, setMedicalStaffSignatureData] = useState(null);
  const [patientSignatureData, setPatientSignatureData] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      medicalStaffSignatureType: "draw",
      patientSignatureType: "draw",
      medicalStaffSignatureData: null,
      patientSignatureData: null,
    }
  });

  const watchMedicalStaffSignatureType = watch("medicalStaffSignatureType");
  const watchPatientSignatureType = watch("patientSignatureType");

  const onSubmit = async (data) => {
    // Validate all data before submission
    const validationResult = formSchema.safeParse(data);
    
    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      Object.keys(fieldErrors).forEach(field => {
        alert(`Error in ${field}: ${fieldErrors[field][0]}`);
      });
      return;
    }
    
    // Prepare data for submission
    const formData = {
      ...data,
      medicalStaffSignatureData: data.medicalStaffSignatureType === "draw" 
        ? medicalStaffSignatureData 
        : medicalStaffSignatureFile ? await fileToBase64(medicalStaffSignatureFile) : null,
      patientSignatureData: data.patientSignatureType === "draw" 
        ? patientSignatureData 
        : patientSignatureFile ? await fileToBase64(patientSignatureFile) : null,
    };

    console.log("Form data:", formData);
    
    // Submit data to Google Apps Script backend
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzhsY9RqVjUp03M2ngBxCODPxMbWjJ4VN_gPZqUKFsxAXmNdjE9PLN8ebl2y4jFYH2Yog/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log("Server response:", result);
        alert("Form submitted successfully! Data has been saved to Google Sheets.");
      } else {
        throw new Error(`Server responded with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const nextStep = async () => {
    // Validate current step before proceeding
    if (step === 1) {
      // Get only step 1 data for validation
      const step1Data = {
        medicalStaffName: watch("medicalStaffName"),
        procedureType: watch("procedureType"),
        patientName: watch("patientName"),
        medicalStaffSignatureType: watch("medicalStaffSignatureType"),
        patientSignatureType: watch("patientSignatureType"),
        medicalStaffSignatureData: medicalStaffSignatureData,
        patientSignatureData: patientSignatureData,
      };
      
      // Validate step 1 data
      const step1Result = step1Schema.safeParse(step1Data);
      
      if (!step1Result.success) {
        // Set errors for step 1 fields
        const fieldErrors = step1Result.error.flatten().fieldErrors;
        Object.keys(fieldErrors).forEach(field => {
          // We'll just show an alert for simplicity
          alert(fieldErrors[field][0]);
        });
        return;
      }
      
      // Check signature data
      const medicalStaffSignatureType = watch("medicalStaffSignatureType");
      const patientSignatureType = watch("patientSignatureType");
      
      if (medicalStaffSignatureType === "draw" && !medicalStaffSignatureData) {
        alert("Silakan gambar tanda tangan tenaga kesehatan");
        return;
      }
      
      if (medicalStaffSignatureType === "upload" && !medicalStaffSignatureFile) {
        alert("Silakan upload tanda tangan tenaga kesehatan");
        return;
      }
      
      if (patientSignatureType === "draw" && !patientSignatureData) {
        alert("Silakan gambar tanda tangan pasien/wali");
        return;
      }
      
      if (patientSignatureType === "upload" && !patientSignatureFile) {
        alert("Silakan upload tanda tangan pasien/wali");
        return;
      }
    } else if (step === 2) {
      // Get only step 2 data for validation
      const step2Data = {
        patientFullName: watch("patientFullName"),
        patientAge: watch("patientAge"),
        patientGender: watch("patientGender"),
        patientAddress: watch("patientAddress"),
        patientDate: watch("patientDate"),
        guardianFullName: watch("guardianFullName"),
        guardianAge: watch("guardianAge"),
        guardianGender: watch("guardianGender"),
        guardianAddress: watch("guardianAddress"),
        guardianDate: watch("guardianDate"),
      };
      
      // Validate step 2 data
      const step2Result = step2Schema.safeParse(step2Data);
      
      if (!step2Result.success) {
        // Set errors for step 2 fields
        const fieldErrors = step2Result.error.flatten().fieldErrors;
        Object.keys(fieldErrors).forEach(field => {
          // We'll just show an alert for simplicity
          alert(fieldErrors[field][0]);
        });
        return;
      }
    }
    
    setStep(step + 1);
  };

  return (
    <div className="container">
      <div className="form-header">
        <h1 className="form-title">Formulir Informed Consent</h1>
        <p className="form-subtitle">Silakan lengkapi informasi sesuai dengan instruksi</p>
      </div>

      {/* Progress indicator */}
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${(step - 1) * 50}%` }}></div>
        {[1, 2, 3].map((stepNum) => (
          <div key={stepNum} className="step-indicator">
            <div className={`step-circle ${step === stepNum ? 'active' : step > stepNum ? 'completed' : 'inactive'}`}>
              {stepNum}
            </div>
            <div className="step-label">
              {stepNum === 1 && 'Data Dasar'}
              {stepNum === 2 && 'Data Lengkap'}
              {stepNum === 3 && 'Finalisasi'}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1 - Basic Data */}
        {step === 1 && (
          <div className="form-section">
            <h2 className="form-title">Data Dasar</h2>
            
            <div className="form-group">
              <div>
                <Label htmlFor="medicalStaffName">Nama Tenaga Kesehatan</Label>
                <Select 
                  id="medicalStaffName"
                  onChange={(e) => setValue("medicalStaffName", e.target.value)}
                >
                  <SelectItem value="">Pilih tenaga kesehatan</SelectItem>
                  {medicalStaffOptions.map((staff) => (
                    <SelectItem key={staff} value={staff}>{staff}</SelectItem>
                  ))}
                </Select>
                {errors.medicalStaffName && (
                  <p className="error-message">{errors.medicalStaffName.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="procedureType">Jenis Tindakan</Label>
                <Select 
                  id="procedureType"
                  onChange={(e) => setValue("procedureType", e.target.value)}
                >
                  <SelectItem value="">Pilih jenis tindakan</SelectItem>
                  {procedureTypeOptions.map((procedure) => (
                    <SelectItem key={procedure} value={procedure}>{procedure}</SelectItem>
                  ))}
                </Select>
                {errors.procedureType && (
                  <p className="error-message">{errors.procedureType.message}</p>
                )}
              </div>

              <div className="form-group">
                <Label htmlFor="patientName">Nama Pasien/Wali</Label>
                <Input 
                  id="patientName" 
                  {...register("patientName")} 
                  placeholder="Masukkan nama pasien atau wali"
                />
                {errors.patientName && (
                  <p className="error-message">{errors.patientName.message}</p>
                )}
              </div>

              {/* Medical Staff Signature */}
              <div className="form-group">
                <Label className="form-label">Tanda Tangan Tenaga Kesehatan</Label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="draw"
                      checked={watchMedicalStaffSignatureType === "draw"}
                      onChange={() => setValue("medicalStaffSignatureType", "draw")}
                    />
                    Gambar
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="upload"
                      checked={watchMedicalStaffSignatureType === "upload"}
                      onChange={() => setValue("medicalStaffSignatureType", "upload")}
                    />
                    Upload File
                  </label>
                </div>
                
                {watchMedicalStaffSignatureType === "draw" ? (
                  <div className="signature-container">
                    <SignatureCanvas 
                      setSignatureData={setMedicalStaffSignatureData} 
                      signatureData={medicalStaffSignatureData}
                    />
                  </div>
                ) : (
                  <div className="signature-container">
                    <FileUpload 
                      setFile={setMedicalStaffSignatureFile} 
                      file={medicalStaffSignatureFile}
                    />
                  </div>
                )}
                {errors.medicalStaffSignatureData && (
                  <p className="error-message">{errors.medicalStaffSignatureData.message}</p>
                )}
              </div>

              {/* Patient Signature */}
              <div className="form-group">
                <Label className="form-label">Tanda Tangan Pasien/Wali</Label>
                <div className="radio-group">
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="draw"
                      checked={watchPatientSignatureType === "draw"}
                      onChange={() => setValue("patientSignatureType", "draw")}
                    />
                    Gambar
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      value="upload"
                      checked={watchPatientSignatureType === "upload"}
                      onChange={() => setValue("patientSignatureType", "upload")}
                    />
                    Upload File
                  </label>
                </div>
                
                {watchPatientSignatureType === "draw" ? (
                  <div className="signature-container">
                    <SignatureCanvas 
                      setSignatureData={setPatientSignatureData} 
                      signatureData={patientSignatureData}
                    />
                  </div>
                ) : (
                  <div className="signature-container">
                    <FileUpload 
                      setFile={setPatientSignatureFile} 
                      file={patientSignatureFile}
                    />
                  </div>
                )}
                {errors.patientSignatureData && (
                  <p className="error-message">{errors.patientSignatureData.message}</p>
                )}
              </div>
            </div>

            <div className="button-group">
              <Button type="button" onClick={nextStep}>Lanjut</Button>
            </div>
          </div>
        )}

        {/* Step 2 - Complete Data */}
        {step === 2 && (
          <div className="form-section">
            <h2 className="form-title">Data Lengkap</h2>
            
            <div className="form-group">
              <div className="form-group">
                <Label htmlFor="patientFullName">Nama Lengkap Pasien</Label>
                <Input 
                  id="patientFullName" 
                  {...register("patientFullName")} 
                  placeholder="Masukkan nama lengkap pasien"
                />
                {errors.patientFullName && (
                  <p className="error-message">{errors.patientFullName.message}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="patientAge">Umur Pasien</Label>
                  <Input 
                    id="patientAge" 
                    type="number" 
                    {...register("patientAge", { valueAsNumber: true })} 
                    placeholder="Masukkan umur"
                    min="1"
                    max="150"
                  />
                  {errors.patientAge && (
                    <p className="error-message">{errors.patientAge.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <Label htmlFor="patientGender">Jenis Kelamin Pasien</Label>
                  <Select 
                    id="patientGender"
                    onChange={(e) => setValue("patientGender", e.target.value)}
                  >
                    <SelectItem value="">Pilih jenis kelamin</SelectItem>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </Select>
                  {errors.patientGender && (
                    <p className="error-message">{errors.patientGender.message}</p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="patientAddress">Alamat Pasien</Label>
                <Input 
                  id="patientAddress" 
                  {...register("patientAddress")} 
                  placeholder="Masukkan alamat lengkap pasien"
                />
                {errors.patientAddress && (
                  <p className="error-message">{errors.patientAddress.message}</p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="patientDate">Tanggal</Label>
                  <Input 
                    id="patientDate" 
                    type="date" 
                    {...register("patientDate")} 
                  />
                  {errors.patientDate && (
                    <p className="error-message">{errors.patientDate.message}</p>
                  )}
                </div>
              </div>
            </div>

            <h3 className="form-title">Data Wali (Jika Ada)</h3>

            <div className="form-group">
              <div className="form-group">
                <Label htmlFor="guardianFullName">Nama Lengkap Wali</Label>
                <Input 
                  id="guardianFullName" 
                  {...register("guardianFullName")} 
                  placeholder="Masukkan nama lengkap wali (opsional)"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="guardianAge">Umur Wali</Label>
                  <Input 
                    id="guardianAge" 
                    type="number" 
                    {...register("guardianAge", { valueAsNumber: true })} 
                    placeholder="Masukkan umur wali (opsional)"
                    min="0"
                  />
                </div>

                <div className="form-group">
                  <Label htmlFor="guardianGender">Jenis Kelamin Wali</Label>
                  <Select 
                    id="guardianGender"
                    onChange={(e) => setValue("guardianGender", e.target.value)}
                  >
                    <SelectItem value="">Tidak Diisi</SelectItem>
                    {genderOptions.map((gender) => (
                      <SelectItem key={gender} value={gender}>{gender}</SelectItem>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="form-group">
                <Label htmlFor="guardianAddress">Alamat Wali</Label>
                <Input 
                  id="guardianAddress" 
                  {...register("guardianAddress")} 
                  placeholder="Masukkan alamat lengkap wali (opsional)"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <Label htmlFor="guardianDate">Tanggal</Label>
                  <Input 
                    id="guardianDate" 
                    type="date" 
                    {...register("guardianDate")} 
                  />
                </div>
              </div>
            </div>

            <div className="button-group">
              <Button type="button" variant="outline" onClick={() => setStep(1)}>Kembali</Button>
              <Button type="button" onClick={nextStep}>Lanjut</Button>
            </div>
          </div>
        )}

        {/* Step 3 - Finalization */}
        {step === 3 && (
          <div className="form-section">
            <h2 className="form-title">Finalisasi</h2>
            
            <div className="form-group">
              <div className="form-group">
                <Label htmlFor="email">Email untuk Konfirmasi</Label>
                <Input 
                  id="email" 
                  type="email" 
                  {...register("email")} 
                  placeholder="Masukkan email Anda"
                />
                {errors.email && (
                  <p className="error-message">{errors.email.message}</p>
                )}
              </div>

              <div className="summary-box">
                <h3 className="form-title">Ringkasan Data</h3>
                <div className="summary-item">
                  <span className="summary-label">Tenaga Kesehatan:</span> {watch("medicalStaffName")}
                </div>
                <div className="summary-item">
                  <span className="summary-label">Jenis Tindakan:</span> {watch("procedureType")}
                </div>
                <div className="summary-item">
                  <span className="summary-label">Nama Pasien/Wali:</span> {watch("patientName")}
                </div>
              </div>
            </div>

            <div className="button-group">
              <Button type="button" variant="outline" onClick={() => setStep(2)}>Kembali</Button>
              <Button type="submit">Submit</Button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}