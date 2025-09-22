import React, { useRef, useState, useEffect } from 'react';
import { Input } from '../ui/input';

const FileUpload = ({ onFileSelect, file, setFile }) => {
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      // Clean up the URL object when component unmounts or file changes
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Check file type
      if (!selectedFile.type.match('image.*')) {
        alert('Please select an image file (JPEG/PNG)');
        return;
      }
      
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit');
        return;
      }
      
      setFile(selectedFile);
      if (onFileSelect) onFileSelect(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      // Check file type
      if (!droppedFile.type.match('image.*')) {
        alert('Please drop an image file (JPEG/PNG)');
        return;
      }
      
      // Check file size (max 10MB)
      if (droppedFile.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit');
        return;
      }
      
      setFile(droppedFile);
      if (onFileSelect) onFileSelect(droppedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="file-upload-container"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={() => fileInputRef.current?.click()}
    >
      <Input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept="image/jpeg,image/png"
      />
      {file ? (
        <div>
          {previewUrl && (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="signature-preview"
            />
          )}
          <p>Selected: {file.name}</p>
          <p>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      ) : (
        <div>
          <p>Drag and drop your signature image here, or click to browse</p>
          <p>Supports JPEG/PNG up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;