import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  isTextArea?: boolean;
}

const Input: React.FC<InputProps> = ({ label, error, isTextArea, className = '', ...props }) => {
  const inputStyles = `w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${
    error ? 'border-red-500 bg-red-50' : 'border-gray-300'
  } ${className}`;

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {isTextArea ? (
        <textarea 
          className={`${inputStyles} min-h-[100px]`} 
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} 
        />
      ) : (
        <input className={inputStyles} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
