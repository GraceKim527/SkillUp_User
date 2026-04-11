"use client";

import Text from "@/components/common/Text";
import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { ROLE_DISPLAY_OPTIONS } from "@/constants/role";
import { AGE_OPTIONS, GENDER_OPTIONS } from "@/constants/profileFormOptions";
import Modal from "@/components/common/Modal";
import { useNewUserOnboardingForm } from "@/hooks/useNewUserOnboardingForm";
import styles from "./styles.module.css";

interface NewUserOnboardingModalProps {
  isOpen: boolean;
  onSaved: () => void;
}

export default function NewUserOnboardingModal({
  isOpen,
  onSaved,
}: NewUserOnboardingModalProps) {
  const {
    selectedRole,
    activeTab,
    selectedInterests,
    selectedAge,
    selectedGender,
    isRoleMenuOpen,
    isAgeMenuOpen,
    roleMenuRef,
    ageMenuRef,
    interestOptions,
    isLoadingInterests,
    isSubmitDisabled,
    isSaving,
    setSelectedAge,
    setSelectedGender,
    setSelectedInterests,
    setActiveTab,
    setIsRoleMenuOpen,
    setIsAgeMenuOpen,
    handleSelectInterest,
    handleSelectRole,
    handleSave,
  } = useNewUserOnboardingForm({ isOpen, onSaved });

  return (
    <Modal isOpen={isOpen} toggle={() => {}}>
      <div className={styles.content}>
        <Text typography="head2_sb_30" color="black" as="h2" className={styles.title}>
          맞춤형 정보를 드릴 수 있도록,
          <br />
          아래 내용을 입력해주세요!
        </Text>

        <div className={styles.topFields}>
          <div className={styles.fieldColumn}>
            <Text typography="label3_m_14" color="black">
              연령
            </Text>
            <div className={styles.dropdown} ref={ageMenuRef}>
              <button
                type="button"
                className={styles.dropdownButton}
                onClick={() => setIsAgeMenuOpen((prev) => !prev)}
              >
                <Text typography="body1_r_16" color={selectedAge ? "neutral-20" : "neutral-50"}>
                  {selectedAge || "연령대를 선택하세요"}
                </Text>
                <ChevronDownIcon color="var(--Neutral-40)" />
              </button>

              {isAgeMenuOpen && (
                <div className={styles.dropdownList}>
                  {AGE_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={styles.dropdownItem}
                      onClick={() => {
                        setSelectedAge(option.label);
                        setIsAgeMenuOpen(false);
                      }}
                    >
                      <Text typography="body1_r_16" color="neutral-20">
                        {option.label}
                      </Text>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.fieldColumn}>
            <Text typography="label3_m_14" color="black">
              성별
            </Text>
            <div className={styles.genderRow}>
              {GENDER_OPTIONS.map((option) => {
                const isActive = selectedGender === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    className={`${styles.genderButton} ${
                      isActive ? styles.genderButtonActive : ""
                    }`}
                    onClick={() => setSelectedGender(option.value)}
                  >
                    <Text
                      typography="label3_m_14"
                      color={isActive ? "white" : "neutral-30"}
                    >
                      {option.label}
                    </Text>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className={styles.section}>
          <Text typography="label3_m_14" color="black">
            직무
          </Text>

          <div className={styles.dropdown} ref={roleMenuRef}>
            <button
              type="button"
              className={styles.dropdownButton}
              onClick={() => setIsRoleMenuOpen((prev) => !prev)}
            >
              <Text typography="body1_r_16" color={selectedRole ? "neutral-20" : "neutral-50"}>
                {selectedRole ?? "직무를 선택하세요"}
              </Text>
              <ChevronDownIcon color="var(--Neutral-40)" />
            </button>

            {isRoleMenuOpen && (
              <div className={styles.dropdownList}>
                {ROLE_DISPLAY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className={styles.dropdownItem}
                    onClick={() => handleSelectRole(option.value)}
                  >
                    <Text typography="body1_r_16" color="neutral-20">
                      {option.value}
                    </Text>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={styles.interestSection}>
          <div className={styles.interestHeader}>
            <div className={styles.interestLabelGroup}>
              <Text typography="label3_m_14" color="black">
                관심사
              </Text>
              <Text typography="label4_m_12" color="neutral-70">
                주요 관심사를 선택해주세요
              </Text>
            </div>

            <div className={styles.roleTabs}>
              {ROLE_DISPLAY_OPTIONS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.value);
                    setSelectedInterests([]);
                  }}
                  className={`${styles.roleTab} ${
                    activeTab === tab.value ? styles.roleTabActive : ""
                  }`}
                >
                  <Text
                    typography="label3_m_14"
                    color={activeTab === tab.value ? "primary-heavy" : "neutral-60"}
                  >
                    {tab.label}
                  </Text>
                </button>
              ))}
            </div>
          </div>

          {isLoadingInterests ? (
            <Text
              typography="body2_r_14"
              color="neutral-60"
              className={styles.infoText}
            >
              관심사 목록을 불러오는 중입니다.
            </Text>
          ) : interestOptions.length === 0 ? (
            <Text
              typography="body2_r_14"
              color="neutral-60"
              className={styles.infoText}
            >
              선택 가능한 관심사가 없습니다.
            </Text>
          ) : (
            <div className={styles.interestsGrid}>
              {interestOptions.map((interest: string) => {
                const isSelected = selectedInterests.includes(interest);

                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleSelectInterest(interest)}
                    className={`${styles.interestChip} ${
                      isSelected ? styles.interestChipActive : ""
                    }`}
                  >
                    <Text
                      typography="label2_m_16"
                      color={isSelected ? "primary-strong" : "fill-strong"}
                    >
                      {interest}
                    </Text>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <button
          type="button"
          className={styles.confirmButton}
          disabled={isSubmitDisabled}
          onClick={handleSave}
        >
          <Text
            typography="sub2_m_18"
            color={isSubmitDisabled ? "neutral-70" : "white"}
          >
            {isSaving ? "저장 중..." : "확인했어요"}
          </Text>
        </button>
      </div>
    </Modal>
  );
}
