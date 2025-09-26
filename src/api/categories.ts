// src/api/categories.ts

import { Category } from "@/types";
import { categories as rawCategories } from "../mock/categories";

/**
 * [HELPER] Giả lập độ trễ của một cuộc gọi mạng.
 * @param ms - Thời gian chờ (tính bằng mili giây).
 */
const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * [API MOCK] Giả lập API lấy danh sách tất cả các danh mục sản phẩm.
 * * @returns Một Promise chứa một mảng các đối tượng Category.
 */
export const getCategories = async (): Promise<Category[]> => {
  await simulateApiDelay();

  // Biến đổi dữ liệu thô từ mock để phù hợp với kiểu `Category`
  const categories: Category[] = rawCategories.map(category => ({
    ...category,
    // Trong tương lai, có thể thêm các logic xử lý khác ở đây nếu cần.
  }));
  
  // SỬA LỖI: Trả về đúng danh sách danh mục thay vì mảng rỗng.
  return categories; 
};