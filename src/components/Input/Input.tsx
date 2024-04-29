import React, { ReactElement, MouseEvent } from 'react';

interface PropsInput {
  type: 'text' | 'color';
  className?: string;
  placeholder?: string;
  onClick?: (event?: MouseEvent) => void | Promise<void>;
}

const Input = ({
  className,
  type,
  onClick,
  placeholder,
}: PropsInput): ReactElement => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      onClick={onClick}
    />
  );
};

export default Input;
