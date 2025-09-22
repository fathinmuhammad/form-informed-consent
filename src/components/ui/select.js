import React from 'react';

const Select = ({ children, className = '', ...props }) => {
  return (
    <select
      className={`form-select ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

const SelectItem = ({ children, value }) => {
  return (
    <option value={value}>{children}</option>
  );
};

export { Select, SelectItem };