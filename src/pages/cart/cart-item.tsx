// src/pages/cart/cart-item.tsx

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { Icon } from "zmp-ui";

import { useCartActions } from "@/hooks/useCart";
import { CartItem as CartItemType } from "@/types";
import { formatPrice } from "@/utils/format";
import QuantityInput from "@/components/quantity-input";
import placeholderImage from '@/static/logo.png';

// Ngưỡng kéo (bằng pixel) để hiển thị và kích hoạt nút xóa
const SWIPE_TO_DELETE_THRESHOLD = 80;

/**
 * Component hiển thị một sản phẩm trong giỏ hàng.
 * Tích hợp các tính năng nâng cao:
 * - Cử chỉ vuốt sang trái để xóa sản phẩm.
 * - Tối ưu hóa re-render cho hiệu năng cao trong danh sách dài.
 */
const CartItem: React.FC<CartItemType> = ({ product, quantity }) => {
  const { addToCart } = useCartActions();
  const navigate = useNavigate();

  // Thiết lập animation cho cử chỉ kéo
  const [{ x }, api] = useSpring(() => ({ x: 0 }));

  // Xử lý cử chỉ kéo để xóa
  const bind = useDrag(
    ({ last, offset: [ox] }) => {
      // Cập nhật vị trí item theo cử chỉ kéo của người dùng
      api.start({ x: Math.min(ox, 0), immediate: true });
      if (last) {
        // Khi người dùng thả tay, kiểm tra xem đã kéo đủ xa chưa
        if (ox < -SWIPE_TO_DELETE_THRESHOLD) {
          api.start({ x: -SWIPE_TO_DELETE_THRESHOLD }); // Giữ nút xóa ở lại
        } else {
          api.start({ x: 0 }); // Trả item về vị trí cũ
        }
      }
    },
    {
      from: () => [x.get(), 0],
      axis: "x",
      bounds: { left: -SWIPE_TO_DELETE_THRESHOLD, right: 0 },
      rubberband: true,
      preventScroll: true,
    }
  );
  
  // Lấy ảnh sản phẩm an toàn, sử dụng ảnh mặc định nếu không có
  const imageUrl = product?.images?.[0] ?? placeholderImage;

  // Điều hướng đến trang chi tiết sản phẩm
  const handleNavigate = () => {
    // SỬA LỖI: Xóa bỏ tùy chọn { viewTransition: true } không hợp lệ
    navigate(`/product/${product.id}`);
  };
  
  // Tối ưu hóa hàm xử lý thay đổi số lượng bằng useCallback
  const handleQuantityChange = useCallback((newQuantity: number) => {
    addToCart(product, newQuantity);
  }, [addToCart, product]);

  // Xử lý xóa sản phẩm (bằng cách cập nhật số lượng về 0)
  const handleDelete = () => {
    handleQuantityChange(0);
  };

  return (
    <div className="relative after:border-b-[0.5px] after:border-black/10 after:absolute after:left-[88px] after:right-0 after:bottom-0 last:after:hidden">
      {/* Nút xóa ẩn */}
      <div
        className="absolute right-0 top-0 bottom-0 py-px"
        style={{ width: SWIPE_TO_DELETE_THRESHOLD }}
      >
        <div
          className="bg-danger text-white/95 w-full h-full flex flex-col space-y-1 justify-center items-center cursor-pointer"
          onClick={handleDelete}
        >
          <Icon icon="zi-delete" />
          <div className="text-2xs font-medium">Xoá</div>
        </div>
      </div>

      {/* Nội dung chính của item, có thể di chuyển được */}
      <animated.div
        {...bind()}
        style={{ x }}
        className="bg-white p-4 flex items-center space-x-4 relative"
      >
        <div 
          className="flex items-center space-x-4 flex-1 cursor-pointer" 
          onClick={handleNavigate}
        >
          <img
            src={imageUrl}
            className="w-14 h-14 rounded-lg bg-skeleton object-cover"
            alt={product.name}
          />
          <div className="flex-1 space-y-1">
            <div className="text-sm line-clamp-2">{product.name}</div>
            <div className="flex flex-col">
              <div className="text-sm font-bold">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && (
                <div className="line-through text-subtitle text-xs">
                  {formatPrice(product.originalPrice)}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="w-24">
          <QuantityInput value={quantity} onChange={handleQuantityChange} />
        </div>
      </animated.div>
    </div>
  );
};

// Tối ưu hóa hiệu năng, chỉ re-render component này khi props (product, quantity) thực sự thay đổi
export default React.memo(CartItem);