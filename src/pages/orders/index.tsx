// src/pages/orders/index.tsx

import { ordersState } from "@/state";
import { OrderStatus } from "@/types"; // Import trực tiếp OrderStatus để đảm bảo type-safe
import { useLocation } from "react-router-dom";
import { Icon, Tabs } from "zmp-ui";
import OrderList from "./order-list";

// Ánh xạ key từ state điều hướng đến ID của tab
const tabMapping = {
  pending: "pending",
  completed: "completed",
  cancelled: "cancelled",
};

export default function OrdersPage() {
  const location = useLocation();
  const defaultTab =
    tabMapping[location.state?.tab as keyof typeof tabMapping] || "pending";

  const tabItems = [
    {
      key: "pending",
      label: (
        <span className="flex items-center space-x-2">
          <Icon icon="zi-clock-1" />
          <span>Đang xử lý</span>
        </span>
      ),
      // SỬA LỖI: Sử dụng prop 'node' và truyền đúng kiểu OrderStatus
      node: <OrderList ordersState={ordersState("pending" as OrderStatus)} />,
    },
    {
      key: "completed",
      label: (
        <span className="flex items-center space-x-2">
          <Icon icon="zi-check-circle" />
          <span>Đã hoàn thành</span>
        </span>
      ),
      node: (
        <OrderList
          ordersState={ordersState("completed" as OrderStatus)}
          isCompleted
        />
      ),
    },
    {
      key: "cancelled",
      label: (
        <span className="flex items-center space-x-2">
          <Icon icon="zi-close-circle" />
          <span>Đã huỷ</span>
        </span>
      ),
      node: <OrderList ordersState={ordersState("cancelled" as OrderStatus)} />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={defaultTab}
      id="order-tabs"
      items={tabItems}
      className="h-full flex flex-col"
    />
  );
}