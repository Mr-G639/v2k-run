import { useLocation } from "react-router-dom";
import { Order } from "@/types";
import OrderSummary from "./order-summary";
import OrderInfo from "./order-info";

function OrderDetailPage() {
  // Phía tích hợp có thể lấy id từ query params, từ đó gọi API đến server để lấy thông tin chi tiết đơn hàng.
  // Tham khảo logic tương tự ở ProductDetailPage (src/pages/catalog/product-detail.tsx)
  // const { id } = useParams();
  // const order = useAtomValue(orderState(Number(id)));

  // Hoặc đơn giản hơn, lấy thông tin đơn hàng từ router state.
  // Điểm khác biệt lớn nhất là phương án này bắt buộc phải truy cập trang chi tiết đơn hàng từ trang danh sách đơn hàng,
  // chứ không thể truy cập trực tiếp từ deeplink như phương án trên.
  const { state } = useLocation();
  const order = state as Order;

  return (
    <div className="w-full p-4 space-y-2">
      <OrderInfo order={order} />
      <OrderSummary full order={order} />
    </div>
  );
}

export default OrderDetailPage;
