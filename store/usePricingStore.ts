import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PricingPlan = 'freemium' | 'standard' | 'premium' | '';

interface PricingStore {
  selectedPlan: PricingPlan;
  userEmail: string;
  setSelectedPlan: (plan: PricingPlan) => void;
  setUserEmail: (email: string) => void;
  reset: () => void;
}

export const usePricingStore = create<PricingStore>()(
  persist(
    (set) => ({
      selectedPlan: '',
      userEmail: '',
      setSelectedPlan: (plan) => set({ selectedPlan: plan }),
      setUserEmail: (email) => set({ userEmail: email }),
      reset: () => set({ selectedPlan: '', userEmail: '' }),
    }),
    {
      name: 'pricing-store', // storage key
      // Optionally, you can whitelist only the fields you want to persist
      // partialize: (state) => ({ selectedPlan: state.selectedPlan, userEmail: state.userEmail }),
    }
  )
);