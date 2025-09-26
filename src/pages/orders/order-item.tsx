// src/pages/orders/order-item.tsx

import { CartItem, Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { Button, List } from "zmp-ui";
import { useNavigate } from "react-router-dom";

// --- THAY ĐỔI: Thêm các props mới ---
interface OrderItemProps extends CartItem {
  clickable?: boolean;
  isCompleted?: boolean;
  onReview: (product: Product) => void;
}

function OrderItem(props: OrderItemProps) {
  const navigate = useNavigate();
  const imageUrl = props.product?.images?.[0] ?? (props.product as any)?.image ?? "";

  const handleClick = () => {
    if (props.clickable) {
      navigate(`/product/${props.product.id}`);
    }
  };

  return (
    <List.Item
      onClick={handleClick}
      className={props.clickable ? "cursor-pointer" : ""}
      prefix={
        <img 
          src={imageUrl} 
          className="w-14 h-14 rounded-lg bg-skeleton"
          alt={props.product.name}
        />
      }
      // --- THAY ĐỔI: Sửa lại suffix để chứa nút đánh giá ---
      suffix={
        <div className="flex flex-col items-end justify-between h-full">
          <div className="text-sm font-medium">
            x{props.quantity}
          </div>
          {props.isCompleted && (
            <Button 
              size="small" 
              variant="tertiary" 
              className="mt-1"
              onClick={(e) => {
                e.stopPropagation();
                props.onReview(props.product);
              }}
            >
              Đánh giá
            </Button>
          )}
        </div>
      }
    >
      <div className="text-sm">{props.product.name}</div>
      <div className="text-sm font-bold mt-1">
        {formatPrice(props.product.price)}
      </div>
      {props.product.originalPrice && (
        <div className="line-through text-subtitle text-4xs">
          {formatPrice(props.product.originalPrice)}
        </div>
      )}
    </List.Item>
  );
}

export default OrderItem;