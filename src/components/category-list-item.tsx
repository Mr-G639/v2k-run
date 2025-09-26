// src/components/category-list-item.tsx

import { Category } from "@/types";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

interface CategoryListItemProps {
  category: Category;
  onClose?: () => void;
}

const CategoryListItem: FC<CategoryListItemProps> = ({ category, onClose }) => {
  const navigate = useNavigate();

  const handleItemClick = () => {
    navigate(`/category/${category.id}`);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Box
      className="p-4 border-b border-gray-200"
      onClick={handleItemClick}
    >
      <Text size="large">{category.name}</Text>
    </Box>
  );
};

export default CategoryListItem;