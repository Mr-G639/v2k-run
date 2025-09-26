// src/utils/cart.ts

import { Cart, Product } from "@/types";

/**
 * Thêm một sản phẩm vào giỏ hàng hoặc tăng số lượng nếu đã tồn tại.
 * @param cart - Giỏ hàng hiện tại.
 * @param product - Sản phẩm cần thêm.
 * @returns Giỏ hàng mới sau khi đã cập nhật.
 */
export const addItemToCart = (cart: Cart, product: Product): Cart => {
  const existingItem = cart.find((item) => item.product.id === product.id);

  if (existingItem) {
    // Nếu sản phẩm đã tồn tại, tăng số lượng
    existingItem.quantity += 1;
  } else {
    // Nếu chưa, thêm sản phẩm mới vào giỏ
    cart.push({
      product,
      quantity: 1,
    });
  }
  return cart;
};

/**
 * Gộp giỏ hàng từ server và giỏ hàng local.
 * Ưu tiên số lượng từ server và cộng dồn nếu sản phẩm trùng lặp.
 * @param serverCart - Giỏ hàng lấy từ server.
 * @param localCart - Giỏ hàng lưu trữ trên máy người dùng.
 * @returns Một giỏ hàng mới đã được gộp.
 */
export const mergeCarts = (serverCart: Cart, localCart: Cart): Cart => {
  const mergedCartMap = new Map<number, Cart[number]>();

  // Thêm các sản phẩm từ giỏ hàng server vào map để xử lý
  for (const item of serverCart) {
    mergedCartMap.set(item.product.id, { ...item });
  }

  // Thêm hoặc gộp các sản phẩm từ giỏ hàng local
  for (const item of localCart) {
    const existingItem = mergedCartMap.get(item.product.id);
    if (existingItem) {
      // Nếu sản phẩm đã có, cộng dồn số lượng
      existingItem.quantity += item.quantity;
    } else {
      // Nếu chưa có, thêm mới vào
      mergedCartMap.set(item.product.id, { ...item });
    }
  }

  // Chuyển map trở lại thành một mảng
  return Array.from(mergedCartMap.values());
};