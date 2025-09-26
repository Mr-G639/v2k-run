// src/pages/home/all-products.tsx

import { FC } from "react";
import { Product } from "../../types";
import ProductGrid from "../../components/product-grid";
import { ProductItemSkeleton } from "../../components/skeleton";
import Section from "../../components/section";

interface AllProductsProps {
  products: Product[];
}

const AllProducts: FC<AllProductsProps> = ({ products }) => {
  return (
    // Sửa: Xóa prop 'padding' và thêm class p-4
    <Section title="Tất cả sản phẩm" className="bg-white p-4">
      {products.length === 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from(new Array(8)).map((_, i) => <ProductItemSkeleton key={i} />)}
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </Section>
  );
};

export default AllProducts;