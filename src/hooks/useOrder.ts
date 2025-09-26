// src/hooks/useOrder.ts

import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  cartState,
  cartTotalState,
  ordersState,
  selectedVoucherState,
} from "@/state";
import { useRequestInformation } from "./useUser";
import { createOrder } from "zmp-sdk/apis";
import { OrderStatus } from "@/types";

/**
 * Custom hook này đóng gói toàn bộ logic của quy trình thanh toán (checkout).
 * Trách nhiệm:
 * 1. Lấy thông tin cần thiết từ state (giỏ hàng, voucher, tổng tiền).
 * 2. Yêu cầu quyền người dùng nếu cần.
 * 3. Gọi API `createOrder` của ZaloPay.
 * 4. Xử lý các tác vụ sau khi thanh toán thành công (xóa giỏ hàng, làm mới danh sách đơn hàng).
 * 5. Điều hướng người dùng và hiển thị thông báo.
 * 6. Bắt và xử lý lỗi trong quá trình thanh toán.
 */
export function useCheckout() {
  const { finalAmount } = useAtomValue(cartTotalState);
  const [cart, setCart] = useAtom(cartState);
  const selectedVoucher = useAtomValue(selectedVoucherState);
  const requestInfo = useRequestInformation();
  const navigate = useNavigate();
  
  // Lấy hàm refresh cho danh sách đơn hàng "đang xử lý" (pending)
  // Vì sau khi thanh toán qua ZaloPay, đơn hàng cần được chủ shop xác nhận
  const refreshPendingOrders = useSetAtom(ordersState("pending" as OrderStatus));

  return async () => {
    try {
      // Bước 1: Yêu cầu các quyền cần thiết từ người dùng một cách tường minh.
      await requestInfo();

      // Bước 2: Gọi API của ZaloPay để tạo và thanh toán đơn hàng.
      await createOrder({
        amount: finalAmount,
        desc: `Thanh toán cho đơn hàng tại V2K. ${
          selectedVoucher ? `(Voucher: ${selectedVoucher.code})` : ""
        }`,
        item: cart.map((item) => ({
          id: String(item.product.id),
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      });

      // Bước 3: Xử lý logic sau khi đơn hàng được tạo thành công.
      setCart([]); // Dọn dẹp giỏ hàng để người dùng có thể mua sắm tiếp.
      await refreshPendingOrders(); // Ra lệnh cho danh sách đơn hàng "Đang xử lý" tải lại dữ liệu mới.
      
      // Điều hướng người dùng đến trang đơn hàng để họ thấy ngay đơn hàng vừa tạo.
      navigate("/orders", { state: { tab: "pending" } });
      
      toast.success("Tạo đơn hàng thành công!", {
        icon: "🎉",
        duration: 4000,
      });

    } catch (error) {
      // Bước 4: Xử lý và thông báo lỗi một cách rõ ràng.
      console.error("Lỗi khi thanh toán:", error);
      toast.error(
        "Thanh toán thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ."
      );
    }
  };
}