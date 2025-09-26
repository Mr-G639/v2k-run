// src/pages/orders/collapsible-order-items.tsx

import { CartItem, Product } from "@/types";
import OrderItem from "./order-item";
import { useState } from "react";
import { Icon, List } from "zmp-ui";

function CollapsibleOrderItems(props: {
  items: CartItem[];
  defaultExpanded?: boolean;
  itemsClickable?: boolean;
  // --- THÊM CÁC PROPS MỚI ---
  isCompleted?: boolean;
  onReview: (product: Product) => void;
}) {
  const [collapsed, setCollapsed] = useState(
    props.defaultExpanded ? false : true
  );

  // Hiển thị 1 sản phẩm nếu đang thu gọn, ngược lại hiển thị tất cả
  const displayItems = collapsed ? props.items.slice(0, 1) : props.items;
  
  // Chỉ hiển thị nút khi đơn hàng có nhiều hơn 1 sản phẩm và không ở trang chi tiết
  const shouldShowToggleButton = props.items.length > 1 && !props.defaultExpanded;

  const toggleCollapse = (e: React.MouseEvent) => {
    // Ngăn sự kiện click lan ra ngoài, tránh việc chuyển trang không mong muốn
    e.stopPropagation(); 
    document.startViewTransition(() => {
      setCollapsed(!collapsed);
    });
  };

  return (
    <>
      <List noSpacing>
        {displayItems.map((item) => (
          <OrderItem 
            key={item.product.id} 
            {...item} 
            clickable={props.itemsClickable}
            // --- TRUYỀN PROPS XUỐNG CHO ORDERITEM ---
            isCompleted={props.isCompleted}
            onReview={props.onReview}
          />
        ))}
      </List>
      
      {/* Hiển thị nút Xem thêm/Thu gọn một cách có điều kiện */}
      {shouldShowToggleButton && (
        <button
          className="w-full flex justify-center items-center space-x-1 text-xs p-2 -mt-4 transition-all relative"
          onClick={toggleCollapse}
        >
          {collapsed ? (
            <>
              <span>Xem thêm</span>
              <Icon icon="zi-chevron-down" />
            </>
          ) : (
            <>
              <span>Thu gọn</span>
              <Icon icon="zi-chevron-up" />
            </>
          )}
        </button>
      )}
    </>
  );
}

export default CollapsibleOrderItems;