// src/api/products.ts

import productsData from "../mock/products.json";
import { Product, PaginatedResponse } from "@/types";

/**
 * [HELPER] Định nghĩa cấu trúc dữ liệu thô của sản phẩm từ file JSON.
 * Điều này giúp đảm bảo an toàn kiểu trong quá trình xử lý dữ liệu mock.
 */
interface RawProductData {
  id: number;
  categoryId: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  video?: string;
  detail?: string;
  soldCount?: number;
}

/**
 * [HELPER] Giả lập độ trễ của một cuộc gọi mạng.
 * @param ms - Thời gian chờ (tính bằng mili giây).
 */
const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * [API MOCK] Giả lập API lấy danh sách sản phẩm từ server, hỗ trợ phân trang.
 *
 * @param page - Số trang hiện tại (mặc định là 1).
 * @param limit - Số lượng sản phẩm trên mỗi trang (mặc định là 10).
 * @returns Một Promise chứa đối tượng PaginatedResponse<Product>.
 * Lưu ý: Dữ liệu trả về ở đây vẫn ở dạng thô (chưa có object 'category' đầy đủ).
 * Việc "enrich" (làm giàu) dữ liệu sẽ được thực hiện ở tầng state management.
 */
export const getAllProducts = async (
  page: number = 1,
  limit: number = 10
): Promise<PaginatedResponse<Product>> => {
  await simulateApiDelay();

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, productsData.length);
  
  // Sửa lỗi & Refactor:
  // 1. Ép kiểu dữ liệu thô về `RawProductData[]` để đảm bảo an toàn kiểu.
  // 2. Ép kiểu kết quả cuối cùng về `any` rồi mới đến `PaginatedResponse<Product>`
  //    để TypeScript hiểu rằng việc biến đổi cuối cùng sẽ diễn ra ở nơi khác (state.ts).
  //    Điều này tốt hơn việc dùng `any[]` một cách chung chung.
  const paginatedData = (productsData as RawProductData[]).slice(startIndex, endIndex);
  const totalItems = productsData.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: paginatedData as any, // Dữ liệu sẽ được hoàn thiện ở tầng state
    totalItems: totalItems,
    totalPages: totalPages,
  };
};