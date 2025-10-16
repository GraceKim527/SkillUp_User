// src/components/events/filters/atoms/filterAtoms.ts

import { RoleOption } from "@/components/events/filters/types/role";
import { atom } from "jotai";

export const roleFilterAtom = atom<RoleOption[]>(["전체"]);
export const onOfflineFilterAtom = atom<string>("");
export const freeFilterAtom = atom<boolean>(false);
export const sortOptionAtom = atom<string>("인기순");
export const startDateAtom = atom<Date | undefined>(undefined);
export const endDateAtom = atom<Date | undefined>(undefined);

// 임시 필터 상태
export const tempOnOfflineFilterAtom = atom<string>("");
export const tempFreeFilterAtom = atom<boolean>(false);
export const tempStartDateAtom = atom<Date | undefined>(undefined);
export const tempEndDateAtom = atom<Date | undefined>(undefined);
