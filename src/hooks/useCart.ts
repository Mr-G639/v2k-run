// src/hooks/useCart.ts

import { useSetAtom, useAtomValue } from "jotai";
import { selectAtom } from 'jotai/utils';
import { useCallback, useMemo } from "react";
import toast from "react-hot-toast";
import { cartState, userVouchersState } from "@/state";
import { Product, CartItem, Voucher } from "@/types";

/**
 * @typedef CartSummary
 * @type {object}
 * @property {CartItem[]} cart - Danh sách các sản phẩm trong giỏ.
 * @property {number} totalPrice - Tổng giá trị đơn hàng (chưa giảm giá).
 * @property {number} totalQuantity - Tổng số lượng sản phẩm.
 * @property {number} finalPrice - Giá cuối cùng sau khi đã áp dụng voucher.
 * @property {Voucher[]} appliedVouchers - Danh sách các voucher đã được áp dụng.
 */
type CartSummary = {
  cart: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  finalPrice: number;
  appliedVouchers: Voucher[];
};

/**
 * Hook để đọc toàn bộ trạng thái của giỏ hàng và các giá trị tính toán liên quan.
 * Component sử dụng hook này sẽ re-render khi giỏ hàng hoặc voucher thay đổi.
 * @returns {CartSummary} Thông tin chi tiết về giỏ hàng.
 */
export function useCart(): CartSummary {
  const cart = useAtomValue(cartState);
  const vouchers = useAtomValue(userVouchersState);

  // Tối ưu hóa: Chỉ tính toán lại khi `cart` hoặc `vouchers` thay đổi.
  const summary = useMemo(() => {
    const calculatedTotalPrice = cart.reduce(
      (acc, currentItem) => acc + (currentItem.product.price ?? 0) * currentItem.quantity,
      0
    );

    const calculatedTotalQuantity = cart.reduce(
      (acc, currentItem) => acc + currentItem.quantity,
      0
    );

    const totalDiscount = vouchers.reduce(
      (acc, voucher) => acc + (voucher.discountValue ?? 0),
      0
    );

    const calculatedFinalPrice = Math.max(0, calculatedTotalPrice - totalDiscount);

    return {
      totalPrice: calculatedTotalPrice,
      totalQuantity: calculatedTotalQuantity,
      finalPrice: calculatedFinalPrice,
    };
  }, [cart, vouchers]);

  return {
    cart,
    ...summary,
    appliedVouchers: vouchers,
  };
}

/**
 * @typedef CartActions
 * @type {object}
 * @property {(product: Product, quantity: number, options?: { toast?: boolean }) => void} addToCart - Thêm, cập nhật, hoặc xóa sản phẩm khỏi giỏ.
 */
type CartActions = {
  addToCart: (product: Product, quantity: number, options?: { toast?: boolean }) => void;
};

/**
 * Hook chuyên cung cấp các hành động (ghi) để thay đổi giỏ hàng.
 * Component sử dụng hook này sẽ không re-render khi `cartState` thay đổi.
 * @returns {CartActions} Các hàm để thao tác với giỏ hàng.
 */
export function useCartActions(): CartActions {
  const setCart = useSetAtom(cartState);

  const addToCart = useCallback((product: Product, quantity: number, options?: { toast?: boolean }) => {
    setCart((currentCart) => {
      const itemIndex = currentCart.findIndex(
        (item) => item.product.id === product.id
      );

      if (itemIndex > -1) {
        if (quantity <= 0) {
          return currentCart.filter((_, index) => index !== itemIndex);
        }
        return currentCart.map((item, index) =>
          index === itemIndex ? { ...item, quantity } : item
        );
      }
      
      if (quantity > 0) {
        return [...currentCart, { product, quantity }];
      }

      return currentCart;
    });

    if (options?.toast && quantity > 0) {
      toast.success("Đã thêm vào giỏ hàng", {
        id: 'add-to-cart-toast',
      });
    }
  }, [setCart]);

  return { addToCart };
}

/**
 * Hook hiệu năng cao chuyên để đọc số lượng của một sản phẩm cụ thể trong giỏ hàng.
 * Component sử dụng hook này sẽ CHỈ re-render khi số lượng của chính sản phẩm đó thay đổi.
 * @param {number} productId - ID của sản phẩm cần lấy số lượng.
 * @returns {number} Số lượng của sản phẩm trong giỏ hàng, mặc định là 0.
 */
export function useCartItemQuantity(productId: number): number {
  const quantityAtom = useMemo(
    () =>
      selectAtom(
        cartState,
        (cart) =>
          cart.find((item) => item.product.id === productId)?.quantity ?? 0
      ),
    [productId]
  );

  return useAtomValue(quantityAtom);
}