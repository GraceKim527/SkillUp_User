// src/components/common/InputField/index.tsx

import styles from "./styles.module.css";
import Text from "../Text";

interface InputFieldProps {
  label: string;
  description?: string;
  children: React.ReactNode;
}

export default function InputField({
  label,
  description,
  children,
}: InputFieldProps) {
  return (
    <div className={styles.inputField}>
      <div className={styles.inputFieldLabel}>
        <Text typography="label3_m_14" color="black" as="span">
          {label}
        </Text>
        {description && (
          <Text typography="label4_m_12" color="neutral-70" as="span">
            {description}
          </Text>
        )}
      </div>

      {children}
    </div>
  );
}
