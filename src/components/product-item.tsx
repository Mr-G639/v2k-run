// src/components/product-item.tsx

import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useState, useMemo } from "react";
import { Button, Icon } from "zmp-ui"; // THÊM IMPORT ICON
import { useCartActions, useCartItemQuantity } from "@/hooks/useCart";
import QuantityInput from "./quantity-input";
import MarqueeText from "./marquee-text";

export interface ProductItemProps {
  product: Product;
  replace?: boolean;
}

export default function ProductItem(props: ProductItemProps) {
  const [selected, setSelected] = useState(false);
  const { product } = props;

  const { addToCart } = useCartActions();
  const cartQuantity = useCartItemQuantity(product.id);

  const handleQuantityChange = (quantity: number, options?: { toast: boolean }) => {
    addToCart(product, quantity, options);
  };

  const discountPercent = useMemo(() => {
    if (product.originalPrice && product.price) {
      return Math.round((1 - product.price / product.originalPrice) * 100);
    }
    return 0;
  }, [product.price, product.originalPrice]);

  return (
    <div
      className="flex flex-col cursor-pointer group bg-section rounded-xl shadow-[0_10px_24px_#0D0D0D17]"
      onClick={() => setSelected(true)}
    >
      <TransitionLink
        to={`/product/${product.id}`}
        replace={props.replace}
        className="p-2 pb-0 flex flex-col flex-1"
      >
        {() => (
          <>
            <img
              src={product.images?.[0] || ""}
              className="w-full aspect-square object-cover rounded-lg"
              style={{
                viewTransitionName: selected
                  ? `product-image-${product.id}`
                  : undefined,
              }}
              alt={product.name}
            />
            <div className="pt-2 pb-1.5 flex flex-col flex-1">
              <div className="h-5 text-xs font-bold">
                <MarqueeText text={product.name} />
              </div>

              <div className="mt-1 flex-1 flex flex-col justify-end space-y-1">
                <div className="flex justify-between items-center">
                  <div className="text-base font-bold text-primary">
                    {formatPrice(product.price)}
                  </div>
                  {product.originalPrice && (
                    <span className="text-danger font-medium text-xs">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs">
                  {product.originalPrice ? (
                    <span className="line-through text-subtitle">
                      {formatPrice(product.originalPrice)}
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                  {product.soldCount && (
                    <div className="flex items-center space-x-1 text-subtitle">
                      {/* THAY ĐỔI Ở ĐÂY: Thêm className="text-primary"
                        để đổi màu icon sang màu xanh chủ đạo của ứng dụng.
                      */}
                      <Icon icon="zi-check" size={14} className="text-primary" />
                      <span>
                        {product.soldCount > 1000 ? `${(product.soldCount / 1000).toFixed(1)}k` : product.soldCount}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </TransitionLink>
      <div className="p-2">
        {cartQuantity === 0 ? (
          <Button
            variant="secondary"
            size="small"
            fullWidth
            onClick={(e) => {
              e.stopPropagation();
              handleQuantityChange(1, { toast: true });
            }}
          >
            Thêm vào giỏ
          </Button>
        ) : (
          <QuantityInput value={cartQuantity} onChange={handleQuantityChange} />
        )}
      </div>
    </div>
  );
}