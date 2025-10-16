// src/components/events/filters/filterElements/FreeFilter/index.tsx

"use client";

import styles from "./styles.module.css";

export default function FreeFilter({
  checked,
  setChecked,
  label = "무료만 보기",
}: {
  checked: boolean;
  setChecked: (checked: boolean) => void;
  label?: string;
}) {
  return (
    <label className={styles.toggleWrapper}>
      <span className={styles.labelText}>{label}</span>
      <div
        className={`${styles.toggle} ${checked ? styles.active : ""}`}
        onClick={() => setChecked(!checked)}
      >
        <div className={styles.circle} />
      </div>
    </label>
  );
}
