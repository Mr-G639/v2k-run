// src/components/category-popup.tsx

import { categoriesState } from "@/state";
import { useAtomValue } from "jotai";
import { FC } from "react";
import { Sheet, Box, Header } from "zmp-ui";
import CategoryListItem from "./category-list-item";

interface CategoryPopupProps {
  visible: boolean;
  onClose: () => void;
}

const CategoryPopup: FC<CategoryPopupProps> = ({ visible, onClose }) => {
  const categories = useAtomValue(categoriesState);

  return (
    <Sheet visible={visible} onClose={onClose} autoHeight>
      <Box className="flex flex-col">
        {/* SỬA LỖI: Đã xóa prop 'onClose' không hợp lệ */}
        <Header title="Danh mục sản phẩm" />
        <Box className="overflow-y-auto">
          {categories.map((category) => (
            <CategoryListItem
              key={category.id}
              category={category}
              onClose={onClose}
            />
          ))}
        </Box>
      </Box>
    </Sheet>
  );
};

export default CategoryPopup;