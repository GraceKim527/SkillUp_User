// src/hooks/mutations/useWithdraw.ts

import { useMutation } from "@tanstack/react-query";
import { withdrawUser } from "@/api/user";
import { WithdrawRequest } from "@/types/user";
import { useAuth } from "@/hooks/useAuth";

// 회원 탈퇴 Hook
export const useWithdraw = () => {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async (data: WithdrawRequest) => {
      return await withdrawUser(data);
    },
    onSuccess: () => {
      // 탈퇴 성공 시 로그아웃 처리
      logout();
    },
  });
};
