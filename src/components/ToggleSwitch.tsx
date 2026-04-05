interface ToggleSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const ToggleSwitch = ({ checked = false, onChange }: ToggleSwitchProps) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={(e) => onChange?.(e.target.checked)}
    />
    <div className="w-11 h-6 bg-border rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-foreground after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-foreground after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
  </label>
);

export default ToggleSwitch;
