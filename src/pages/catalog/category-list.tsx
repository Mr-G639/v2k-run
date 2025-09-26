// src/pages/catalog/category-list.tsx

import React, { Suspense } from 'react';
import { useAtomValue } from 'jotai';
import { categoriesState } from '@/state';
import { Box, Text, Header } from 'zmp-ui';
import { Link } from 'react-router-dom';
import { Category } from '@/types';
import { PageSkeleton } from '@/components/skeleton';

const CategoryItem: React.FC<{ category: Category }> = ({ category }) => (
  <Link to={`/category/${category.id}`} className="block">
    <Box className="p-4 border-b border-gray-200">
      <Text className="font-medium">{category.name}</Text>
    </Box>
  </Link>
);

const CategoryListContent: React.FC = () => {
  const categories = useAtomValue(categoriesState);

  return (
    <Box>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </Box>
  );
};

const CategoryListPage: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Tất cả danh mục" />
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<PageSkeleton />}>
          <CategoryListContent />
        </Suspense>
      </div>
    </div>
  );
};

export default CategoryListPage;