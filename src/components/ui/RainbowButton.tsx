import React from "react";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function RainbowButton({
  children,
  className = "",
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={`rainbow-button ${className}`}
      {...props}
    >
      <span className="rainbow-button-content">
        {children}
      </span>
    </button>
  );
}
