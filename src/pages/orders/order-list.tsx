// src/pages/orders/order-list.tsx

import { Order, Product } from "@/types";
import { useAtomValue, useSetAtom, WritableAtom } from "jotai";
import { loadable } from "jotai/utils";
import { useMemo, useState } from "react";
import { EmptyOrder } from "@/components/empty";
import ErrorMessage from "@/components/error-message";
import OrderSummary from "./order-summary";
import { OrderSummarySkeleton } from "@/components/skeleton";
import ReviewModal from "./review-modal"; // --- THÊM IMPORT MỚI ---

interface OrderListProps {
  ordersState: WritableAtom<Promise<Order[]>, [void], void>;
  isCompleted?: boolean; // --- THÊM PROP MỚI ---
}

function OrderList(props: OrderListProps) {
  const orderListLoadable = useAtomValue(
    useMemo(() => loadable(props.ordersState), [props.ordersState])
  );
  const refreshOrders = useSetAtom(props.ordersState);
  
  // --- THÊM STATE ĐỂ QUẢN LÝ MODAL ---
  const [reviewingProduct, setReviewingProduct] = useState<Product | null>(null);

  if (orderListLoadable.state === "hasError") {
    return (
      <ErrorMessage
        message="Không thể tải danh sách đơn hàng."
        onRetry={() => refreshOrders()}
      />
    );
  }

  if (orderListLoadable.state === "loading") {
    return (
      <div className="space-y-2 p-4">
        <OrderSummarySkeleton />
        <OrderSummarySkeleton />
        <OrderSummarySkeleton />
      </div>
    );
  }
  
  if (orderListLoadable.state === "hasData" && orderListLoadable.data.length === 0) {
    return <EmptyOrder />;
  }

  return (
    <>
      <div className="space-y-2 p-4">
        {orderListLoadable.data.map((order) => (
          <OrderSummary 
            key={order.id} 
            order={order} 
            // --- TRUYỀN PROPS XUỐNG ---
            isCompleted={props.isCompleted}
            onReview={setReviewingProduct}
          />
        ))}
      </div>
      {/* --- RENDER MODAL --- */}
      <ReviewModal 
        product={reviewingProduct} 
        onClose={() => setReviewingProduct(null)} 
      />
    </>
  );
}

export default OrderList;