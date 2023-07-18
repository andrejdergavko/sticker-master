import { create } from 'zustand';

import { IProduct } from '~app-types/entities';

interface ProductsStore {
  products: IProduct[];
  setProducts: (products: IProduct[]) => void;
  deleteProducts: (uuids: string[]) => void;
  editProduct: (uuid: string, newValues: Partial<IProduct>) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products: IProduct[]) => set({ products }),
  deleteProducts: (uuids) =>
    set((state) => ({
      products: state.products.filter(
        (product) => !uuids.includes(product.uuid)
      ),
    })),
  editProduct: (uuid, newValues) =>
    set((state) => ({
      products: state.products.map((product) =>
        product.uuid === uuid ? { ...product, ...newValues } : product
      ),
    })),
}));
