import React from 'react';

const Input = ({ className = '', type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={`form-input ${className}`}
      {...props}
    />
  );
};

export { Input };