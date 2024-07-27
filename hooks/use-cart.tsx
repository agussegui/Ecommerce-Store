import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { persist, createJSONStorage } from "zustand/middleware"; 

import { Product } from '@/types';
import { AlertTriangle } from 'lucide-react';

interface CartStore {
  items: Product[];
  addItem: (data: Product) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}
//This hook acts as a for remove, add and know if there is a product and create it in the LocalStorage 
const useCart = create(
  persist<CartStore>((set, get) => ({
  items: [],
  addItem: (data: Product) => {
    const currentItems = get().items;
    const existingItem = currentItems.find((item) => item.id === data.id);
    
    if (existingItem) {
      return toast('Articulo ya en el Carrito.');
    }

    set({ items: [...get().items, data] });
    toast.success('Articulo agregado al Carrito');
  },
  removeItem: (id: string) => {
    set({ items: [...get().items.filter((item) => item.id !== id)] });
    toast.success('Articulo borrado del carrito');
  },
  removeAll: () => set({ items: [] }),
}), {
  name: 'Carro-Tienda',
  storage: createJSONStorage(() => localStorage)
}));

export default useCart;