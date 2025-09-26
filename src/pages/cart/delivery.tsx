// src/pages/cart/delivery.tsx

import Section from "@/components/section";
import TransitionLink from "@/components/transition-link";
import {
  LocationMarkerLineIcon,
  LocationMarkerPackageIcon,
  PlusIcon,
} from "@/components/vectors";
import { shippingAddressState } from "@/state";
import { useAtomValue } from "jotai";
import DeliverySummary from "./delivery-summary";

/**
 * Component con, chịu trách nhiệm hiển thị thông tin địa chỉ giao hàng
 * hoặc nút để thêm địa chỉ mới.
 */
function ShippingAddressSummary() {
  const shippingAddress = useAtomValue(shippingAddressState);

  // Nếu chưa có địa chỉ, hiển thị nút "Thêm địa chỉ"
  if (!shippingAddress) {
    return (
      <TransitionLink
        className="flex flex-col space-y-2 justify-center items-center p-4 w-full"
        to="/shipping-address"
      >
        <LocationMarkerPackageIcon />
        <div className="flex space-x-1 items-center text-center p-2">
          <PlusIcon width={16} height={16} />
          <span className="text-sm font-medium">Thêm địa chỉ nhận hàng</span>
        </div>
      </TransitionLink>
    );
  }

  // Nếu đã có địa chỉ, hiển thị thông tin tóm tắt
  return (
    <DeliverySummary
      icon={<LocationMarkerLineIcon />}
      title="Địa chỉ nhận hàng"
      subtitle={shippingAddress.alias}
      description={shippingAddress.address}
      linkTo="/shipping-address"
    />
  );
}

/**
 * Component chính đã được tái cấu trúc triệt để.
 * Toàn bộ logic lựa chọn phương thức đã được loại bỏ.
 */
function Delivery() {
  return (
    <Section title="Địa chỉ giao hàng" className="rounded-lg">
      <ShippingAddressSummary />
    </Section>
  );
}

export default Delivery;