import { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "outline";

const variantClasses: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-accent-hover",
  outline: "border border-primary text-primary hover:bg-primary hover:text-white",
};

const baseClasses =
  "inline-block px-6 py-3 rounded text-[15px] font-medium transition-colors duration-150";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  children: ReactNode;
}

export function LinkButton({ variant = "primary", className = "", children, ...props }: LinkButtonProps) {
  return (
    <a className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </a>
  );
}
