// src/pages/home/search-result.tsx

import { categoriesState, productsState } from "@/state";
import { Category, Product } from "@/types";
import { useAtomValue } from "jotai";
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { Box, Text } from "zmp-ui";

const CategoryItem: React.FC<{ category: Category }> = ({ category }) => (
  <Link to={`/category/${category.id}`} className="block">
    <Box className="p-4"><Text className="font-medium">{category.name}</Text></Box>
  </Link>
);

const ProductItem: React.FC<{ product: Product }> = ({ product }) => (
  <Link to={`/product/${product.id}`} className="block">
    <Box className="p-4 flex items-center space-x-4">
      <img src={product.images[0]} className="w-16 h-16 rounded-lg" alt={product.name} />
      <Box>
        <Text className="font-medium">{product.name}</Text>
        <Text size="small" className="text-gray-500">{product.price.toLocaleString()}đ</Text>
      </Box>
    </Box>
  </Link>
);

export const SearchResult: React.FC<{ keyword: string }> = ({ keyword }) => {
  const products = useAtomValue(productsState);
  const categories = useAtomValue(categoriesState);

  const searchResults = useMemo(() => {
    if (!keyword.trim()) return { products: [], categories: [] };
    const lowercasedKeyword = keyword.toLowerCase();
    const filteredProducts = products.filter((p) =>
      p.name.toLowerCase().includes(lowercasedKeyword)
    );
    const filteredCategories = categories.filter((c) =>
      c.name.toLowerCase().includes(lowercasedKeyword)
    );
    return {
      products: filteredProducts,
      categories: filteredCategories,
    };
  }, [keyword, products, categories]);

  if (searchResults.products.length === 0 && searchResults.categories.length === 0) {
    return (
      <Box className="p-4 text-center">
        <Text>Không tìm thấy kết quả nào cho "{keyword}"</Text>
      </Box>
    );
  }

  return (
    <Box>
      {searchResults.categories.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
      {searchResults.products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Box>
  );
};