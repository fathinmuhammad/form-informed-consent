import React from 'react';

const Button = ({ children, variant = 'primary', onClick, type = 'button', disabled = false, className = '' }) => {
  const baseClass = 'btn';
  const variantClass = variant === 'secondary' ? 'btn-secondary' : 
                      variant === 'outline' ? 'btn-outline' : 
                      'btn-primary';
  
  return (
    <button
      type={type}
      className={`${baseClass} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { Button };