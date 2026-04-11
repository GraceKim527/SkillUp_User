// src/hooks/useNewUserOnboardingForm.ts

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { RoleName, ROLE_NAME } from "@/constants/role";
import { useUserInterests } from "@/hooks/queries/useUser";
import { useUpdateUserProfile } from "@/hooks/mutations/useUpdateUserProfile";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";

interface UseNewUserOnboardingFormOptions {
  isOpen: boolean;
  onSaved: () => void;
}

/**
 * 신규 유저 온보딩 모달의 상태 및 제출 로직.
 * - 연령/성별/직무/관심사 폼 상태
 * - 드롭다운 열림 상태 및 외부 클릭으로 닫히도록 처리
 * - 직무 변경 시 activeTab과 선택된 관심사 초기화
 * - 모달이 닫힐 때 모든 상태 리셋
 */
export function useNewUserOnboardingForm({
  isOpen,
  onSaved,
}: UseNewUserOnboardingFormOptions) {
  const { userName } = useAuth();
  const { showToast } = useToast();
  const { mutate: updateProfile, isPending: isSaving } = useUpdateUserProfile();

  const [selectedRole, setSelectedRole] = useState<RoleName | null>(null);
  const [activeTab, setActiveTab] = useState<RoleName>(ROLE_NAME.PLANNING);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [isRoleMenuOpen, setIsRoleMenuOpen] = useState(false);
  const [isAgeMenuOpen, setIsAgeMenuOpen] = useState(false);

  const roleMenuRef = useRef<HTMLDivElement>(null);
  const ageMenuRef = useRef<HTMLDivElement>(null);

  const { data: apiInterests, isLoading: isLoadingInterests } =
    useUserInterests(activeTab);

  // 모달이 닫힐 때 상태 리셋
  useEffect(() => {
    if (!isOpen) {
      setSelectedRole(null);
      setSelectedInterests([]);
      setSelectedAge("");
      setSelectedGender("");
      setActiveTab(ROLE_NAME.PLANNING);
      setIsRoleMenuOpen(false);
      setIsAgeMenuOpen(false);
    }
  }, [isOpen]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!roleMenuRef.current?.contains(event.target as Node)) {
        setIsRoleMenuOpen(false);
      }
      if (!ageMenuRef.current?.contains(event.target as Node)) {
        setIsAgeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const interestOptions = useMemo(() => {
    if (apiInterests && apiInterests.length > 0) {
      return apiInterests.map((item: { name: string }) => item.name);
    }
    return [];
  }, [apiInterests]);

  const handleSelectInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((item) => item !== interest)
        : [...prev, interest]
    );
  };

  const handleSelectRole = (role: RoleName) => {
    setSelectedRole(role);
    setActiveTab(role);
    setSelectedInterests([]);
    setIsRoleMenuOpen(false);
  };

  const isSubmitDisabled =
    !selectedRole ||
    selectedInterests.length === 0 ||
    interestOptions.length === 0 ||
    !selectedAge ||
    !selectedGender ||
    isSaving;

  const handleSave = () => {
    if (isSubmitDisabled) return;

    updateProfile(
      {
        name: userName || "사용자",
        age: selectedAge,
        gender: selectedGender,
        role: selectedRole,
        interests: selectedInterests,
        marketingAgreement: false,
      },
      {
        onSuccess: () => {
          showToast({
            title: "정보 저장 완료",
            message: "맞춤 정보가 저장되었습니다.",
            type: "success",
            duration: 2500,
          });
          onSaved();
        },
        onError: () => {
          showToast({
            title: "저장 실패",
            message: "입력값을 확인 후 다시 시도해주세요.",
            type: "error",
            duration: 3000,
          });
        },
      }
    );
  };

  return {
    // 상태
    selectedRole,
    activeTab,
    selectedInterests,
    selectedAge,
    selectedGender,
    isRoleMenuOpen,
    isAgeMenuOpen,
    // ref
    roleMenuRef,
    ageMenuRef,
    // 파생
    interestOptions,
    isLoadingInterests,
    isSubmitDisabled,
    isSaving,
    // 핸들러
    setSelectedAge,
    setSelectedGender,
    setSelectedInterests,
    setActiveTab,
    setIsRoleMenuOpen,
    setIsAgeMenuOpen,
    handleSelectInterest,
    handleSelectRole,
    handleSave,
  };
}
