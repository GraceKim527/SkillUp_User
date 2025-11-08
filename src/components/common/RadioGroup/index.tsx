// src/components/common/RadioGroup/index.tsx

import styles from "./styles.module.css";
import Text from "../Text";

export interface Option {
  label: string;
  value: string;
}

interface RadioGroupProps {
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

export default function RadioGroup({
  options,
  selectedValue,
  onChange,
}: RadioGroupProps) {
  return (
    <div className={styles.radioGroup}>
      {options.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`${styles.radioButton} ${
            selectedValue === value ? styles.active : ""
          }`}
        >
          <Text
            typography="sub3_m_16"
            color={selectedValue === value ? "white" : "neutral-30"}
          >
            {label}
          </Text>
        </button>
      ))}
    </div>
  );
}
