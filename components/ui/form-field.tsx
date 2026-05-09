import { motion } from "framer-motion";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "textarea";
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  rows?: number;
}

export function FormField({
  label,
  name,
  type = "text",
  placeholder,
  maxLength,
  required,
  rows = 3,
}: FormFieldProps) {
  const inputClasses =
    "w-full px-4 py-2.5 rounded-lg bg-surface border border-border-subtle text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none focus:border-brand-purple/40 focus:ring-1 focus:ring-brand-purple/20 transition-all";

  return (
    <div>
      <label htmlFor={name} className="block text-sm text-text-secondary mb-1.5">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          maxLength={maxLength}
          rows={rows}
          placeholder={placeholder}
          className={`${inputClasses} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
    </div>
  );
}

export function FormMessage({
  error,
  success,
}: {
  error?: string;
  success?: string;
}) {
  if (error) {
    return (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-red-500 font-mono"
      >
        error: {error}
      </motion.p>
    );
  }
  if (success) {
    return (
      <motion.p
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm text-green-600 font-mono"
      >
        {success}
      </motion.p>
    );
  }
  return null;
}
