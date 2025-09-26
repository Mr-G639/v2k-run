// src/components/search-overlay.tsx

import { searchOverlayVisibleState } from "@/state";
import { useAtomValue } from "jotai"; // SỬA LỖI: Bỏ import 'useSetAtom' không cần thiết
import { FC, Suspense, useEffect, useState, ChangeEvent, useMemo } from "react";
import { Box, Icon, Input, Text } from "zmp-ui";
import ProductItem from "./product-item";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/products";
import { getCategories } from "@/api/categories";
import { Product, PaginatedResponse, Category } from "@/types";
import HorizontalDivider from "./horizontal-divider";
import { useNavigate } from "react-router-dom";

// Component hiển thị kết quả tìm kiếm DANH MỤC
const CategorySearchResult: FC<{ keyword: string }> = ({ keyword }) => {
  const navigate = useNavigate();

  const { data: allCategories = [] } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const filteredCategories = useMemo(() => {
    if (!keyword) return [];
    return allCategories.filter(category =>
      category.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, allCategories]);

  if (filteredCategories.length === 0) {
    return null;
  }

  const handleItemClick = (categoryId: number) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <Box p={4} className="bg-white">
      <Text.Title size="small">Danh mục liên quan</Text.Title>
      <Box mt={4}>
        {filteredCategories.map(item => (
          <div
            key={item.id}
            className="flex items-center space-x-4 py-2"
            onClick={() => handleItemClick(item.id)}
          >
            <Icon icon="zi-search" />
            <Text>{item.name}</Text>
          </div>
        ))}
      </Box>
    </Box>
  );
};

// Component hiển thị kết quả tìm kiếm SẢN PHẨM
const ProductSearchResult: FC<{ keyword: string }> = ({ keyword }) => {
  const navigate = useNavigate();

  const { data: allProducts = [] } = useQuery<PaginatedResponse<Product>, Error, Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
    select: (response) => response.data,
  });

  const filteredProducts = useMemo(() => {
    if (!keyword) return [];
    return allProducts.filter((product: Product) =>
      product.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, allProducts]);
  
  const handleItemClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  if (filteredProducts.length === 0 && keyword) {
    return (
      <Box className="flex-1 flex justify-center items-center bg-background">
        <Text size="xLarge" className="text-gray-500">Không tìm thấy sản phẩm</Text>
      </Box>
    );
  }
  
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <Box p={4} className="bg-white flex-1">
      <Text.Title size="small">Sản phẩm</Text.Title>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {filteredProducts.map((product: Product) => (
          <div key={product.id} onClick={() => handleItemClick(product.id)}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </Box>
  );
};

export const SearchOverlay: FC = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const visible = useAtomValue(searchOverlayVisibleState);

  useEffect(() => {
    if (visible) {
      const input = document.getElementById("search-input-overlay");
      if (input) {
        input.focus();
      }
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-30 bg-background flex flex-col pt-safe-area-top">
      <Box className="flex items-center p-3 bg-white shadow-md">
        <div className="cursor-pointer" onClick={() => navigate(-1)}>
          <Icon icon="zi-arrow-left" size={24} />
        </div>
        <Input.Search
          id="search-input-overlay"
          className="flex-1 mx-3"
          placeholder="Tìm kiếm sản phẩm..."
          value={keyword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)}
        />
      </Box>
      <Box className="flex-1 overflow-y-auto">
        <Suspense>
          <CategorySearchResult keyword={keyword} />
          <HorizontalDivider />
          <ProductSearchResult keyword={keyword} />
        </Suspense>
      </Box>
    </div>
  );
};