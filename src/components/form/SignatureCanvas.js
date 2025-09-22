import React, { useRef, useEffect } from 'react';
import SignaturePad from 'signature_pad';

const SignatureCanvas = ({ onEnd, signatureData, setSignatureData }) => {
  const canvasRef = useRef(null);
  const signaturePadRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      signaturePadRef.current = new SignaturePad(canvasRef.current, {
        backgroundColor: 'rgb(255,255,255)',
        penColor: 'rgb(0,0,0)',
        onEnd: () => {
          if (signaturePadRef.current) {
            const data = signaturePadRef.current.toDataURL();
            setSignatureData(data);
            if (onEnd) onEnd(data);
          }
        }
      });
    }

    return () => {
      if (signaturePadRef.current) {
        signaturePadRef.current.off();
      }
    };
  }, []);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      signaturePadRef.current.clear();
      setSignatureData(null);
    }
  };

  return (
    <div className="signature-container">
      <canvas 
        ref={canvasRef} 
        className="signature-canvas"
        style={{ touchAction: 'none' }}
      />
      <div className="button-group">
        <Button 
          type="button"
          onClick={clearSignature}
        >
          Clear
        </Button>
      </div>
    </div>
  );
};

// Simple button component for the signature canvas
const Button = ({ children, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      className="btn btn-secondary"
      onClick={onClick}
      style={{ marginTop: '10px' }}
    >
      {children}
    </button>
  );
};

export default SignatureCanvas;