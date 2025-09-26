import CartList from "./cart-list";
import ApplyVoucher from "./apply-voucher";
import CartSummary from "./cart-summary";
import { useAtomValue } from "jotai";
import { cartState } from "@/state";
import { EmptyCart } from "@/components/empty";
import Delivery from "./delivery";
import HorizontalDivider from "@/components/horizontal-divider";
import Pay from "./pay";

export default function CartPage() {
  const cart = useAtomValue(cartState);

  if (!cart.length) {
    return <EmptyCart />;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        <Delivery />
        <CartList />
        <ApplyVoucher />
        <CartSummary />
      </div>
      <HorizontalDivider />
      <Pay />
    </div>
  );
}
