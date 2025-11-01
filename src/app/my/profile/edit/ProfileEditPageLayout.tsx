// src/app/my/profile/edit/ProfileEditPageLayout.tsx

"use client";
import styles from "./styles.module.css";
import Text from "@/components/common/Text";
import ProfileImageUploader from "@/components/myPage/profile/ProfileImageUploader";
import { useState } from "react";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";
import InputField from "@/components/common/InputField";
import Input from "@/components/common/Input";
import Dropdown, { DropdownOption } from "@/components/common/Dropdown";

export default function ProfileEditPageLayout() {
  const [imageUrl, setImageUrl] = useState<string>(
    ProfileImageDefault.src.toString() || ""
  );
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const handleChangeImage = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeAge = (value: DropdownOption) => {
    setAge(value.value);
  };

  return (
    <div className={styles.profileEditPageLayout}>
      <div className={styles.profileEditPageLayoutHeader}>
        <Text typography="head2_sb_30" color="black" as="h2">
          프로필 설정
        </Text>
        <div className={styles.profileEditPageLayoutHeaderRight}>
          <ProfileImageUploader
            imageUrl={imageUrl}
            onChangeImage={handleChangeImage}
          />
        </div>
      </div>
      <div className={styles.profileEditPageLayoutContent}>
        <div className={styles.profileEditPageLayoutContentItem}>
          <InputField label="이름">
            <Input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={handleChangeName}
            />
          </InputField>
          <InputField label="연령">
            <Dropdown
              options={[
                { label: "10대", value: "10대" },
                { label: "20대", value: "20대" },
                { label: "30대", value: "30대" },
                { label: "40대", value: "40대" },
                { label: "50대", value: "50대" },
                { label: "60대", value: "60대" },
                { label: "70대", value: "70대" },
                { label: "80대", value: "80대" },
                { label: "90대", value: "90대" },
              ]}
              selected={{ label: age, value: age }}
              onSelect={handleChangeAge}
              block={true}
              buttonLabel={age ? age : "연령대를 선택하세요"}
            />
          </InputField>
        </div>
      </div>
    </div>
  );
}
