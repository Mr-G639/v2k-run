import { useAtomValue } from "jotai";
import { cartState } from "@/state";
import CartItem from "./cart-item";
import Section from "@/components/section";
import { Icon, Input } from "zmp-ui";
import HorizontalDivider from "@/components/horizontal-divider";

export default function CartList() {
  const cart = useAtomValue(cartState);

  return (
    <Section
      title={
        <div className="flex items-center space-x-2">
          <Icon icon="zi-calendar" />
          <div>
            <span className="font-normal text-sm">Thời gian nhận:</span>{" "}
            <span className="font-medium text-sm">Từ 16h, 20/1/2025</span>
          </div>
        </div>
      }
      className="flex-1 overflow-y-auto rounded-lg"
    >
      <div className="w-full">
        {cart.map((item) => (
          <CartItem key={item.product.id} {...item} />
        ))}
      </div>
      <HorizontalDivider />
      <div className="flex items-center px-4 pt-3 pb-2 space-x-4">
        <div className="text-sm font-medium">Ghi chú</div>
        <input
          type="text"
          placeholder="Lưu ý cho người bán..."
          className="text-sm text-right flex-1 focus:outline-none"
        />
      </div>
    </Section>
  );
}
