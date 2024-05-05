import React, { ReactElement, ReactNode, MouseEvent } from 'react';
import './Button.css';

interface PropsButton {
  type: 'button' | 'submit' | 'reset';
  text?: string;
  children?: ReactNode;
  className?: string;
  onClick?: (event?: MouseEvent) => void | Promise<void>;
  disabled?: boolean;
  variant?: 'main' | 'icon';
}

const Button = ({
  className,
  type = 'button',
  text,
  onClick,
  children,
  disabled,
}: PropsButton): ReactElement => {
  return (
    <button
      className={`base-button ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children || text}
    </button>
  );
};

export default Button;
