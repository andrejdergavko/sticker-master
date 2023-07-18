import { create } from 'zustand';

import { IProduct } from '~app-types/entities';

interface ProductsStore {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  deleteProduct: (uuid: string) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products: IProduct[]) => set({ products }),
  deleteProduct: (uuid: string) =>
    set((state) => ({
      products: state.products.filter((product) => product.uuid !== uuid),
    })),
}));
