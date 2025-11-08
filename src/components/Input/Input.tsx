// components/Input/Input.tsx
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
  disabled?: boolean; // ⭐ ДОБАВЛЯЕМ
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  label,
  error,
  required = false,
  className,
  disabled = false // ⭐ ДОБАВЛЯЕМ
}) => {
  return (
    <InputContainer className={className}>
      {label && (
        <Label>
          {label}
        </Label>
      )}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        $hasError={!!error}
        required={required}
        disabled={disabled} // ⭐ ПЕРЕДАЕМ
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
  color: #000000;
  font-size: 14px;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  padding: 12px 16px;
  border: 2px solid ${props => props.$hasError ? '#e74c3c' : '#e1e5e9'};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  color: #000000;
  
  &::placeholder {
    color: #666;
  }
  
  &:focus {
    outline: none;
    border-color: #000000;
  }

  /* ⭐ ДОБАВЛЯЕМ СТИЛИ ДЛЯ DISABLED */
  &:disabled {
    background-color: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
    border-color: #e1e5e9;
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