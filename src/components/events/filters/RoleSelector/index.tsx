// src/components/events/filters/RoleSelector/index.tsx

"use client";

import styles from "./styles.module.css";
import {
  GearOutlineIcon,
  LightBulbOutlineIcon,
  OverlapShapeOutlineIcon,
  SparkleBlobOutlineIcon,
} from "./icons";
import {
  JobCategory,
  JOB_CATEGORY,
  getJobCategoryLabel,
} from "@/constants/category";

interface RoleSelectorProps {
  selected: JobCategory[];
  onSelect: (option: JobCategory[]) => void;
  multiSelect?: boolean; // true: 다중 선택 가능, false: 단일 선택만 가능
}

const ROLES: {
  key: JobCategory;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}[] = [
  { key: JOB_CATEGORY.ALL, label: getJobCategoryLabel(JOB_CATEGORY.ALL), icon: undefined },
  { key: JOB_CATEGORY.PM, label: getJobCategoryLabel(JOB_CATEGORY.PM), icon: LightBulbOutlineIcon },
  { key: JOB_CATEGORY.DESIGN, label: getJobCategoryLabel(JOB_CATEGORY.DESIGN), icon: OverlapShapeOutlineIcon },
  { key: JOB_CATEGORY.DEVELOPMENT, label: getJobCategoryLabel(JOB_CATEGORY.DEVELOPMENT), icon: GearOutlineIcon },
  { key: JOB_CATEGORY.AI, label: getJobCategoryLabel(JOB_CATEGORY.AI), icon: SparkleBlobOutlineIcon },
];

export default function RoleSelector({
  selected = [JOB_CATEGORY.ALL],
  onSelect,
  multiSelect = true,
}: RoleSelectorProps) {
  const handleClick = (category: JobCategory) => {
    // 단일 선택 모드
    if (!multiSelect) {
      onSelect([category]);
      return;
    }

    // 다중 선택 모드 (기존 로직)
    if (category === JOB_CATEGORY.ALL) {
      onSelect([JOB_CATEGORY.ALL]);
      return;
    }

    let newSelected: JobCategory[] = selected.filter(
      (r) => r !== JOB_CATEGORY.ALL
    );

    if (newSelected.includes(category)) {
      newSelected = newSelected.filter((r) => r !== category);
    } else {
      newSelected = [...newSelected, category];
    }

    if (newSelected.length === 0) {
      newSelected = [JOB_CATEGORY.ALL];
    }

    onSelect(newSelected);
  };

  const isActive = (category: JobCategory) => {
    if (!selected) return false;
    return selected.includes(category);
  };

  return (
    <div className={styles.roleSelector}>
      {ROLES.map((role) => (
        <button
          key={role.key}
          onClick={() => handleClick(role.key)}
          className={`${styles.roleSelectorButton} ${
            isActive(role.key) ? styles.active : ""
          }`}
        >
          {role.icon && (
            <role.icon
              className={`${styles.icon} ${
                isActive(role.key) ? styles.iconActive : ""
              }`}
            />
          )}
          <span>{role.label}</span>
        </button>
      ))}
    </div>
  );
}
