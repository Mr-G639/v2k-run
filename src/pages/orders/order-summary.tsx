// src/pages/orders/order-summary.tsx

import HorizontalDivider from "@/components/horizontal-divider";
import Section from "@/components/section";
import { Order, PaymentStatus, Product } from "@/types";
import { formatPrice } from "@/utils/format";
import CollapsibleOrderItems from "./collapsible-order-items";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

// Refactor: Tạo một đối tượng mapping để quản lý thông tin của paymentStatus.
// Giúp code sạch hơn, dễ đọc, dễ bảo trì và mở rộng.
const paymentStatusMapping: Record<PaymentStatus, { text: string; className: string }> = {
  pending: { text: "Chờ xác nhận", className: "text-primary" },
  success: { text: "Đã thanh toán", className: "text-primary" },
  failed: { text: "Thanh toán thất bại", className: "text-danger" },
};

interface OrderSummaryProps {
  order: Order;
  full?: boolean; // `full` dùng để xác định có đang ở trang chi tiết không
  // --- THÊM CÁC PROPS MỚI ---
  isCompleted?: boolean;
  onReview: (product: Product) => void;
}

/**
 * Component hiển thị thông tin tóm tắt của một đơn hàng.
 * Có thể được sử dụng trong danh sách đơn hàng hoặc trang chi tiết đơn hàng.
 * @param {OrderSummaryProps} props - Props của component.
 */
function OrderSummary(props: OrderSummaryProps) {
  const { order, full = false, isCompleted, onReview } = props;
  const navigate = useNavigate();

  // Lấy thông tin hiển thị cho trạng thái thanh toán từ mapping object.
  const statusInfo = paymentStatusMapping[order.paymentStatus] || { text: 'Không xác định', className: 'text-inactive' };
  
  // Sửa lỗi: Sử dụng ngày nhận hàng thực tế từ dữ liệu `order` thay vì hardcode.
  // Dùng `useMemo` để chỉ định dạng lại ngày tháng khi `order.receivedAt` thay đổi để tối ưu hiệu năng.
  const formattedReceivedDate = useMemo(() => {
    return new Date(order.receivedAt).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }, [order.receivedAt]);

  const handleNavigation = () => {
    // Chỉ điều hướng đến trang chi tiết nếu không ở chế độ `full`.
    if (!full) {
      navigate(`/order/${order.id}`, {
        state: order,
        viewTransition: true,
      });
    }
  };

  return (
    <Section
      title={
        <div className="w-full flex justify-between items-center space-x-2 font-normal">
          <span className="text-xs truncate">
            Thời gian nhận: {formattedReceivedDate}
          </span>
          <span className={`text-xs ${statusInfo.className}`}>
            {statusInfo.text}
          </span>
        </div>
      }
      className="flex-1 overflow-y-auto rounded-lg cursor-pointer"
      onClick={handleNavigation}
    >
      <div className="w-full">
        <CollapsibleOrderItems
          items={order.items}
          defaultExpanded={full}
          itemsClickable={full} // Sản phẩm trong danh sách có thể click được khi ở trang chi tiết.
          // --- TRUYỀN PROPS XUỐNG ---
          isCompleted={isCompleted}
          onReview={onReview}
        />
      </div>
      <HorizontalDivider />
      <div className="flex justify-between items-center px-4 py-2 space-x-4">
        <div className="text-xs">Tổng tiền hàng</div>
        <div className="text-sm font-medium">
          {formatPrice(order.total)}
        </div>
      </div>
    </Section>
  );
}

export default OrderSummary;