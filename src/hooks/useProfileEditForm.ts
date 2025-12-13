// src/hooks/useProfileEditForm.ts

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/user";
import { RoleName, ROLE_NAME } from "@/constants/role";
import { useUpdateUserProfile, useUserInterests } from "@/hooks/useUser";
import { DropdownOption } from "@/components/common/Dropdown";
import ProfileImageDefault from "@/assets/images/logoDefaultImg.png";

export const useProfileEditForm = (initialData: UserProfile) => {
  const router = useRouter();

  // Form State
  const [imageUrl, setImageUrl] = useState<string>(
    initialData.profileImageUrl || ProfileImageDefault.src.toString()
  );
  const [name, setName] = useState<string>(initialData.name);
  const [selectedGender, setSelectedGender] = useState<string>(
    initialData.gender
  );
  const [selectedAge, setSelectedAge] = useState<string>(initialData.age);
  const [selectedJob, setSelectedJob] = useState<string>(initialData.role);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    initialData.interests
  );
  const [activeTab, setActiveTab] = useState<RoleName>(
    (initialData.role as RoleName) || ROLE_NAME.PLANNING
  );
  const [isMarketingAgreed, setIsMarketingAgreed] = useState<boolean>(
    initialData.marketingAgreement
  );
  const [currentRoleName, setCurrentRoleName] = useState<RoleName>(
    initialData.role as RoleName
  );
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  // API Hooks
  const { data: apiInterestData, isLoading: isLoadingInterests } =
    useUserInterests(currentRoleName);
  const { mutate: updateProfile, isPending: isUpdating } =
    useUpdateUserProfile();

  // Computed Data
  const interestOptions =
    apiInterestData && apiInterestData.length > 0
      ? apiInterestData.map((item: { name: string }) => ({
          label: item.name,
          value: item.name,
        }))
      : [];

  // Handlers
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
    setSelectedAge(value.label);
  };

  const handleChangeGender = (value: string) => {
    setSelectedGender(value);
  };

  const handleChangeJob = (value: DropdownOption) => {
    setSelectedJob(value.label);
  };

  const handleChangeInterest = (value: string[]) => {
    setSelectedInterests(value);
  };

  const handleTabChange = (tab: string) => {
    const roleName = tab as RoleName;
    setActiveTab(roleName);
    setCurrentRoleName(roleName);
  };

  const toggleAlert = () => {
    setIsAlertOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsAlertOpen(true);
  };

  const handleConfirmCancel = () => {
    router.back();
  };

  const handleSave = () => {
    const userProfile: UserProfile = {
      name,
      profileImageUrl: imageUrl,
      age: selectedAge,
      gender: selectedGender,
      role: selectedJob,
      interests: selectedInterests,
      marketingAgreement: isMarketingAgreed,
    };

    updateProfile(userProfile, {
      onSuccess: () => {
        // 추후 토스트 메시지 추가
        console.log("프로필 업데이트 성공");
      },
      onError: (error) => {
        console.error("프로필 업데이트 실패:", error);
      },
    });
  };

  return {
    // State
    imageUrl,
    name,
    selectedGender,
    selectedAge,
    selectedJob,
    selectedInterests,
    activeTab,
    isMarketingAgreed,
    currentRoleName,
    isAlertOpen,
    isLoadingInterests,
    isUpdating,
    interestOptions,

    // Handlers
    handleChangeImage,
    handleChangeName,
    handleChangeAge,
    handleChangeGender,
    handleChangeJob,
    handleChangeInterest,
    handleTabChange,
    toggleAlert,
    handleCancel,
    handleConfirmCancel,
    handleSave,
    setIsMarketingAgreed,
  };
};
