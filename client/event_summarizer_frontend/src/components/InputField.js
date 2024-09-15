import React from 'react';

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="shadow rounded w-full py-2 px-3 text-gray-700 focus:outline-none"
      />
    </div>
  );
};

export default InputField;
