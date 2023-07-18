'use client';
import ProductsTable from '~components/tables/products-table/ProductsTable';
import { useProductsStore } from '~store/products';

export default function Home() {
  const { products = [], deleteProducts, editProduct } = useProductsStore();

  return (
    <div className="mx-14 mb-14 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-slate-100">
        <h6 className="mx-4 text-lg font-medium">Позиции</h6>
      </div>
      <ProductsTable
        data={products}
        onDelete={deleteProducts}
        onEdit={editProduct}
      />
    </div>
  );
}
