// src/components/category-popup.tsx

import { categoriesState } from "@/state";
import { useAtomValue } from "jotai";
import { FC, Suspense } from "react";
import { Sheet, Box, Header } from "zmp-ui";
import CategoryListItem from "./category-list-item";

interface CategoryPopupProps {
  visible: boolean;
  onClose: () => void;
}

const CategoryPopup: FC<CategoryPopupProps> = ({ visible, onClose }) => {
  const categories = useAtomValue(categoriesState);

  return (
    // SỬA LỖI: Thêm className="z-50" để đưa popup lên lớp hiển thị cao nhất
    <Sheet visible={visible} onClose={onClose} autoHeight className="z-50">
      <Box className="flex flex-col">
        <Header title="Danh mục sản phẩm" />
        <Box className="overflow-y-auto">
          <Suspense fallback={<Box className="p-4">Đang tải danh mục...</Box>}>
            <div className="grid grid-cols-4 gap-4 p-4">
              {categories.map((category) => (
                <CategoryListItem
                  key={category.id}
                  category={category}
                  onClose={onClose}
                />
              ))}
            </div>
          </Suspense>
        </Box>
      </Box>
    </Sheet>
  );
};

export default CategoryPopup;