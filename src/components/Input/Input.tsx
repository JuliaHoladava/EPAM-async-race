import React, { ReactElement, ChangeEvent } from 'react';

interface PropsInput {
  type: 'text' | 'color';
  className?: string;
  placeholder?: string;
  value: string;
  onChange?: (event?: ChangeEvent) => void | Promise<void>;
}

const Input = ({
  className,
  type,
  value,
  onChange,
  placeholder,
}: PropsInput): ReactElement => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
