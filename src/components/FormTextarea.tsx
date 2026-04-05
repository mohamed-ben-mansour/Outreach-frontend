interface FormTextareaProps {
  label: string;
  optional?: boolean;
  rows?: number;
  placeholder?: string;
  value?: string;
  mono?: boolean;
  hint?: string;
  onChange?: (value: string) => void;
}

const FormTextarea = ({ label, optional, rows = 3, placeholder, value, mono, hint, onChange }: FormTextareaProps) => (
  <div>
    <label className="block text-sm font-medium text-secondary-foreground mb-1.5">
      {label} {optional && <span className="text-muted-foreground font-normal">(optional)</span>}
    </label>
    <textarea
      rows={rows}
      className={`w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground ${mono ? "font-mono" : ""}`}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
    {hint && <p className="text-xs text-muted-foreground mt-1">{hint}</p>}
  </div>
);

export default FormTextarea;
