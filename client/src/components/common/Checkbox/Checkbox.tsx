// Checkbox.tsx

import React from 'react';
import './checkbox.scss';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, title }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="checkbox-container">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="checkbox-input"
      />
      <span className="checkmark"></span>
      <span className="checkbox-label">{title}</span>
    </label>
  );
};

export default Checkbox;
