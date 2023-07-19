import { create } from 'zustand';

import { IProduct } from '~app-types/entities';

interface ProductsStore {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  deleteProducts: (ids: string[]) => void;
  editProduct: (id: string, newValues: Partial<IProduct>) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products: IProduct[]) => set({ products }),
  deleteProducts: (ids) =>
    set((state) => ({
      products: state.products.filter((product) => !ids.includes(product.id)),
    })),
  editProduct: (id, newValues) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? { ...product, ...newValues } : product
      ),
    })),
}));
