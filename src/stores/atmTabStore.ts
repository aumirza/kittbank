import { create } from 'zustand';

interface ATMTabState {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useATMTabStore = create<ATMTabState>((set) => ({
  activeTab: 'list',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
