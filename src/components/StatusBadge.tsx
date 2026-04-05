interface StatusBadgeProps {
  label: string;
  color: "green" | "yellow" | "blue" | "red";
}

const colorMap = {
  green: "bg-success/10 text-success border-success/30",
  yellow: "bg-warning/10 text-warning border-warning/30",
  blue: "bg-primary/10 text-primary border-primary/30",
  red: "bg-destructive/10 text-destructive border-destructive/30",
};

const StatusBadge = ({ label, color }: StatusBadgeProps) => (
  <span className={`text-xs px-2 py-1 rounded-full border ${colorMap[color]}`}>
    {label}
  </span>
);

export default StatusBadge;
