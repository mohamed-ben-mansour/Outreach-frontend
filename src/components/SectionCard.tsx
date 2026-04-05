import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  danger?: boolean;
}

const SectionCard = ({ children, className = "", danger }: SectionCardProps) => (
  <div
    className={`bg-card border rounded-xl p-6 ${
      danger ? "border-destructive/30" : "border-border"
    } ${className}`}
  >
    {children}
  </div>
);

export default SectionCard;
