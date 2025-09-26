// src/pages/catalog/category-detail.tsx

import React, { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { productsByCategoryState } from '@/state';
import ProductGrid from '@/components/product-grid';
import { ProductGridSkeleton } from '@/components/skeleton';

/**
 * Component hiển thị danh sách sản phẩm thuộc về một danh mục cụ thể.
 */
const CategoryDetailContent: React.FC = () => {
  // Lấy ID danh mục từ URL
  const { id } = useParams<{ id: string }>();

  // Sử dụng ID để lấy danh sách sản phẩm tương ứng từ atomFamily
  const products = useAtomValue(productsByCategoryState(id!));

  return <ProductGrid products={products} />;
};

/**
 * Trang chi tiết danh mục, chịu trách nhiệm xử lý trạng thái loading.
 */
const CategoryDetailPage: React.FC = () => {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <CategoryDetailContent />
    </Suspense>
  );
};

export default CategoryDetailPage;