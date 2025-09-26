// src/pages/cart/pay.tsx

import { useCheckout } from "@/hooks/useOrder";
import { useAtomValue } from "jotai";
import { cartTotalState } from "@/state";
import { formatPrice } from "@/utils/format";
import { Button } from "zmp-ui";
import { useState } from "react";

export default function Pay() {
  const { totalAmount } = useAtomValue(cartTotalState);
  const checkout = useCheckout();
  const [paying, setPaying] = useState(false);

  return (
    <div className="flex-none flex items-center py-3 px-4 space-x-2 bg-section">
      <div className="space-y-1 flex-1">
        <div className="text-xs text-subtitle">Tổng thanh toán</div>
        <div className="text-sm font-medium text-primary">
          {formatPrice(totalAmount)}
        </div>
      </div>
      <Button
        onClick={async () => {
          setPaying(true);
          // SỬA LỖI: Hàm checkout giờ đã xử lý mọi thứ, chỉ cần gọi nó
          await checkout();
          setPaying(false);
        }}
        disabled={paying}
      >
        Thanh toán
      </Button>
    </div>
  );
}