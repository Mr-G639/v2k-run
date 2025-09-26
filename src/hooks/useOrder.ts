// src/hooks/useOrder.ts

import { useAtomValue, useAtom, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  cartTotalState,
  cartState,
  ordersState,
  selectedVoucherState, // Đã thêm import
} from "@/state";
import { useRequestInformation } from "./useUser";
import { createOrder } from "zmp-sdk/apis";

export function useCheckout() {
  const { finalAmount } = useAtomValue(cartTotalState); // SỬA: Lấy giá trị cuối cùng sau khi đã áp dụng voucher
  const [cart, setCart] = useAtom(cartState);
  const selectedVoucher = useAtomValue(selectedVoucherState); // Lấy thông tin voucher đã được chọn
  const requestInfo = useRequestInformation();
  const navigate = useNavigate();
  const refreshNewOrders = useSetAtom(ordersState("pending"));

  return async () => {
    try {
      await requestInfo();
      await createOrder({
        amount: finalAmount, // SỬA: Sử dụng finalAmount để gửi đúng số tiền cần thanh toán
        desc: `Thanh toán đơn hàng. ${
          selectedVoucher ? `Sử dụng voucher ${selectedVoucher.code}` : ""
        }`, // Thêm thông tin voucher vào mô tả đơn hàng
        item: cart.map((item) => ({
          id: String(item.product.id), // SỬA: Chuyển đổi ID sản phẩm sang string theo yêu cầu của ZaloPay API
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });
      
      // Xử lý sau khi tạo đơn hàng thành công
      setCart([]); // Xóa giỏ hàng
      refreshNewOrders(); // Làm mới danh sách đơn hàng "chờ xác nhận"
      navigate("/orders", {
        viewTransition: true,
      });
      toast.success("Thanh toán thành công. Cảm ơn bạn đã mua hàng!", {
        icon: "🎉",
        duration: 5000,
      });
    } catch (error) {
      console.warn(error);
      toast.error(
        "Thanh toán thất bại. Vui lòng kiểm tra nội dung lỗi bên trong Console."
      );
    }
  };
}