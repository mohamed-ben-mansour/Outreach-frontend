interface FormInputProps {
  label: string;
  optional?: boolean;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const FormInput = ({ label, optional, type = "text", placeholder, value, onChange }: FormInputProps) => (
  <div>
    <label className="block text-sm font-medium text-secondary-foreground mb-1.5">
      {label} {optional && <span className="text-muted-foreground font-normal">(optional)</span>}
    </label>
    <input
      type={type}
      className="w-full px-3 py-2 bg-surface-2 border border-border rounded-lg text-foreground text-sm focus:ring-2 focus:ring-primary focus:border-transparent placeholder-muted-foreground"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
    />
  </div>
);

export default FormInput;
