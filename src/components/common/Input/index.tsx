// src/components/common/Input/index.tsx

import styles from "./styles.module.css";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) {
  return (
    <input
      className={styles.input}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
