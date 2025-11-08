import React from 'react';
import styled from 'styled-components';

export interface InputProps {
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  className
}) => {
  return (
    <InputContainer className={className}>
      {label && (
        <Label>
          {label}
          {required && <Required>*</Required>}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        $hasError={!!error}
        required={required}
      />
      {error && <ErrorText>{error}</ErrorText>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: 500;
  color: #333;
  font-size: 14px;
`;

const Required = styled.span`
  color: #e74c3c;
  margin-left: 4px;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#e1e5e9'};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #007bff;
  }
  
  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 14px;
  }
`;

const ErrorText = styled.span`
  color: #e74c3c;
  font-size: 12px;
  margin-top: 4px;
`;