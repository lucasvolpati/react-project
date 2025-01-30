import {create} from 'zustand';

type Store = {
  formData: FormData[];
  addData: (newData: FormData) => void;
};

export const clientsUseStore = create<Store>((set) => ({
  formData: [],
  addData: (newData: FormData) =>
    set((state) => ({
      formData: [...state.formData, newData],
    })),
}));
