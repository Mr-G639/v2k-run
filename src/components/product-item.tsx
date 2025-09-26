// src/components/product-item.tsx

import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useState, useMemo } from "react";
import { Icon } from "zmp-ui";
import { useCartActions } from "@/hooks/useCart";
import MarqueeText from "./marquee-text";
import { useNavigate } from "react-router-dom";

export interface ProductItemProps {
  product: Product;
  replace?: boolean;
}

const SaleBadge = ({ percentage }: { percentage: number }) => {
  if (percentage <= 0) {
    return null;
  }
  return (
    <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden z-10">
      <div className="absolute transform -rotate-45 bg-primary text-white text-center font-semibold py-1 left-[-34px] top-[18px] w-[120px] shadow-md">
        -{percentage}%
      </div>
    </div>
  );
};

export default function ProductItem(props: ProductItemProps) {
  const [selected, setSelected] = useState(false);
  const { product } = props;

  const { addToCart } = useCartActions();
  const navigate = useNavigate();

  const discountPercent = useMemo(() => {
    if (product.originalPrice && product.price < product.originalPrice) {
      return Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      );
    }
    return 0;
  }, [product.price, product.originalPrice]);

  const displaySoldCount = useMemo(() => {
    if (!product.soldCount) return null;
    if (product.soldCount > 999) return "999+";
    return product.soldCount;
  }, [product.soldCount]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1, { toast: true });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product, 1, { toast: false });
    navigate("/cart");
  };

  return (
    <div
      className="relative flex flex-col cursor-pointer group bg-section rounded-xl shadow-[0_10px_24px_#0D0D0D17] overflow-hidden"
      onClick={() => setSelected(true)}
    >
      <SaleBadge percentage={discountPercent} />
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
                </div>
                <div className="flex justify-between items-center text-xs">
                  {product.originalPrice && product.originalPrice > product.price ? (
                    <span className="line-through text-subtitle">
                      {formatPrice(product.originalPrice)}
                    </span>
                  ) : (
                    <span>&nbsp;</span>
                  )}
                  {displaySoldCount && (
                    <div className="flex items-center space-x-1 text-subtitle">
                      <Icon icon="zi-check" size={14} className="text-primary" />
                      <span>{displaySoldCount}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </TransitionLink>
      
      {/* SỬA LỖI & NÂNG CẤP: Bo tròn góc cho cả cụm nút */}
      <div className="flex items-center w-full p-2 pt-0">
        <div className="flex w-full rounded-lg overflow-hidden">
          <button
            onClick={handleAddToCart}
            // SỬA LỖI: Sửa 'w-1/trd' thành 'w-1/3'
            className="flex-none w-1/3 flex items-center justify-center p-2 bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
            aria-label="Thêm vào giỏ hàng"
          >
            <Icon icon="zi-plus-circle" size={24} />
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-grow w-2/3 p-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-colors"
          >
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}