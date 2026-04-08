import Link from "next/link";

type ButtonProps = {
  variant?: "primary" | "secondary" | "gold";
  size?: "sm" | "md" | "lg";
  href?: string;
  lang?: string;
  type?: "button" | "submit";
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
};

const variantStyles = {
  primary:
    "bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary",
  secondary:
    "border-2 border-primary text-primary hover:bg-primary-tint focus-visible:ring-primary",
  gold: "bg-accent text-white hover:brightness-110 focus-visible:ring-accent",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  lang,
  type = "button",
  className = "",
  children,
  disabled,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center rounded-[var(--radius)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  if (href) {
    const resolvedHref = lang ? `/${lang}${href}` : href;
    return (
      <Link href={resolvedHref} className={base}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={base} disabled={disabled}>
      {children}
    </button>
  );
}
