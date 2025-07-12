import * as React from "react";

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onCheckedChange, className, ...props }) => (
  <input
    type="checkbox"
    checked={checked}
    onChange={e => onCheckedChange(e.target.checked)}
    className={className}
    {...props}
  />
);
