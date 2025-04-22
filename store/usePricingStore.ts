import { create } from 'zustand';

type PricingPlan = 'freemium' | 'standard' | 'premium' | '';

interface PricingStore {
  selectedPlan: PricingPlan;
  userEmail: string;
  setSelectedPlan: (plan: PricingPlan) => void;
  setUserEmail: (email: string) => void;
  reset: () => void;
}

export const usePricingStore = create<PricingStore>((set) => ({
  selectedPlan: '',
  userEmail: '',
  setSelectedPlan: (plan) => set({ selectedPlan: plan }),
  setUserEmail: (email) => set({ userEmail: email }),
  reset: () => set({ selectedPlan: '', userEmail: '' }),
}));