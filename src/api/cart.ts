// src/api/cart.ts

import { Cart, Product, Category } from '@/types';
import productsData from "../mock/products.json";

// --- CẢI THIỆN: Khởi tạo dữ liệu mock category một cách nhất quán ---
// Điều này giúp đảm bảo rằng mọi sản phẩm đều có thông tin category hợp lệ.
const mockCategories: Category[] = [
  { id: 1, name: "Trái cây", image: "" },
  { id: 2, name: "Tráng miệng", image: "" },
  { id: 3, name: "Đồ ăn nhẹ", image: "" },
  { id: 4, name: "Sữa", image: "" },
  { id: 5, name: "Gia dụng", image: "" },
];

// Giả lập trạng thái giỏ hàng trên server (in-memory)
let dummyCart: Cart = [];

/**
 * [HELPER] Tìm kiếm và chuyển đổi dữ liệu sản phẩm thô từ file mock.
 * @param productId - ID của sản phẩm cần tìm.
 * @returns Đối tượng Product hoàn chỉnh nếu tìm thấy, ngược lại trả về undefined.
 */
const findAndFormatProduct = (productId: number): Product | undefined => {
  const productData = productsData.find(p => p.id === productId);

  if (!productData) {
    console.error(`[Mock API] Không tìm thấy sản phẩm với ID: ${productId}`);
    return undefined;
  }

  // --- SỬA LỖI & REFACTOR: Đảm bảo dữ liệu Category nhất quán và an toàn ---
  // Tìm category tương ứng từ mảng mockCategories đã định nghĩa.
  const category = mockCategories.find(c => c.id === productData.categoryId) 
                 // Cung cấp một category mặc định an toàn nếu không tìm thấy.
                 || { id: 99, name: "Danh mục chung", image: "" };

  return {
    ...productData,
    // --- SỬA LỖI: Xử lý an toàn trường hợp images có thể là null/undefined ---
    images: productData.images ?? [],
    category,
  };
};

/**
 * [API MOCK] Giả lập API lấy thông tin giỏ hàng từ server.
 * @returns Một Promise chứa trạng thái hiện tại của giỏ hàng.
 */
export const getCartFromApi = async (): Promise<Cart> => {
  await new Promise(resolve => setTimeout(resolve, 400)); // Giả lập độ trễ mạng
  console.log("[Mock API] getCartFromApi -> Trả về giỏ hàng:", dummyCart);
  // Trả về một bản sao để đảm bảo tính bất biến (immutability)
  return [...dummyCart];
};

/**
 * [API MOCK] Giả lập API cập nhật số lượng của một sản phẩm trong giỏ hàng.
 * - Thêm mới nếu sản phẩm chưa có và quantity > 0.
 * - Cập nhật số lượng nếu sản phẩm đã có.
 * - Xóa sản phẩm nếu quantity <= 0.
 * @param productId - ID của sản phẩm cần cập nhật.
 * @param quantity - Số lượng mới.
 * @returns Một Promise chứa trạng thái giỏ hàng sau khi đã cập nhật.
 */
export const updateCartItemQuantityApi = async (productId: number, quantity: number): Promise<Cart> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  console.log(`[Mock API] updateCartItemQuantityApi -> productId: ${productId}, quantity: ${quantity}`);

  const existingItemIndex = dummyCart.findIndex(item => item.product.id === productId);

  if (existingItemIndex > -1) {
    // Sản phẩm đã có trong giỏ hàng
    if (quantity > 0) {
      dummyCart[existingItemIndex].quantity = quantity;
    } else {
      // Xóa sản phẩm nếu số lượng <= 0
      dummyCart.splice(existingItemIndex, 1);
    }
  } else if (quantity > 0) {
    // Sản phẩm chưa có, thêm mới vào giỏ hàng
    const productToAdd = findAndFormatProduct(productId);
    if (productToAdd) {
      dummyCart.push({ product: productToAdd, quantity });
    } else {
      // Ném lỗi nếu không tìm thấy sản phẩm để thêm vào giỏ, giúp gỡ lỗi dễ hơn.
      throw new Error(`[Mock API] Thêm thất bại: Sản phẩm với ID ${productId} không tồn tại.`);
    }
  }

  console.log("[Mock API] updateCartItemQuantityApi -> Giỏ hàng sau cập nhật:", dummyCart);
  return [...dummyCart];
};

/**
 * [API MOCK] Giả lập API đồng bộ hóa toàn bộ giỏ hàng với server.
 * @param cart - Trạng thái giỏ hàng mới cần đồng bộ.
 * @returns Một Promise chứa trạng thái giỏ hàng đã được server xác nhận.
 */
export const updateCartApi = async (cart: Cart): Promise<Cart> => {
  await new Promise(resolve => setTimeout(resolve, 400));
  console.log("[Mock API] updateCartApi -> Đồng bộ hóa với giỏ hàng:", cart);
  dummyCart = [...cart]; // Ghi đè toàn bộ giỏ hàng giả lập
  return [...dummyCart];
};