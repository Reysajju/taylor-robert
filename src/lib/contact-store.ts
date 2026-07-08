import { create } from "zustand";

interface ContactModalState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useContactModal = create<ContactModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));