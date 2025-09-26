// src/components/floating-cart-preview.tsx

import { useAtomValue } from "jotai";
import Badge from "./badge";
import { CartIcon } from "./vectors";
import { cartState, cartTotalState } from "@/state";
import { formatPrice } from "@/utils/format";
import TransitionLink from "./transition-link";
import { useRouteHandle } from "@/hooks/useUtility";

function FloatingCartPreview() {
  const cart = useAtomValue(cartState);
  const { totalItems, totalAmount } = useAtomValue(cartTotalState);
  const [handle] = useRouteHandle();

  if (totalItems === 0 || handle?.noFloatingCart) {
    return null;
  }

  return (
    <TransitionLink
      to="/cart"
      // SỬA LỖI: Thêm z-40 để đưa popup lên trên các phần tử khác
      className={`fixed left-4 right-4 ${
        handle?.noFooter ? "bottom-6" : "bottom-16"
      } mb-sb flex items-center space-x-2 text-left bg-primary text-primaryForeground px-4 py-2 rounded-lg z-40 shadow-lg animate-slide-in-bottom`}
    >
      <Badge
        value={cart.length}
        style={{
          boxShadow: "none",
        }}
      >
        <CartIcon mono />
      </Badge>
      <span className="text-base font-medium flex-1">
        {formatPrice(totalAmount)}
      </span>
      <span className="text-sm font-semibold">Xem giỏ hàng</span>
    </TransitionLink>
  );
}

export default FloatingCartPreview;