import React from 'react';

const Label = ({ children, className = '', htmlFor, ...props }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`form-label ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};

export { Label };