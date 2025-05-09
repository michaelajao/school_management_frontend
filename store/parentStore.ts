import { create } from 'zustand';
import { Student, Parent } from '@/lib/utils';

interface ParentStore {
  selectedParent: Parent | null;
  setSelectedParent: (parent: Parent | null) => void;
}

export const useParentStore = create<ParentStore>((set) => ({
  selectedParent: null,
  setSelectedParent: (parent) => set({ selectedParent: parent }),
}));
