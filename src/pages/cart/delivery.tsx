import HorizontalDivider from "@/components/horizontal-divider";
import Section from "@/components/section";
import { StationSkeleton } from "@/components/skeleton";
import TransitionLink from "@/components/transition-link";
import {
  HomeIcon,
  LocationMarkerLineIcon,
  LocationMarkerPackageIcon,
  PackageDeliveryIcon,
  PlusIcon,
  ShipperIcon,
} from "@/components/vectors";
import {
  deliveryModeState,
  selectedStationState,
  shippingAddressState,
} from "@/state";
import { useAtom, useAtomValue } from "jotai";
import { Suspense } from "react";
import DeliverySummary from "./delivery-summary";

function ShippingAddressSummary() {
  const shippingAddress = useAtomValue(shippingAddressState);

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

function SelectedStationSummary() {
  const selectedStation = useAtomValue(selectedStationState);
  return (
    <DeliverySummary
      icon={<HomeIcon />}
      title="Nhận hàng tại"
      subtitle={selectedStation.name}
      description={selectedStation.address}
      linkTo="/stations"
    />
  );
}

function Delivery() {
  const [selectedDeliveryMode, setSelectedDeliveryMode] =
    useAtom(deliveryModeState);

  return (
    <Section title="Hình thức giao hàng" className="rounded-lg">
      <div className="grid grid-cols-2 gap-4 p-4 pt-2">
        {(
          [
            {
              type: "shipping",
              name: "Giao tận nơi",
              icon: <ShipperIcon />,
            },
            {
              type: "pickup",
              name: "Tự đến lấy",
              icon: <PackageDeliveryIcon />,
            },
          ] as const
        ).map((option) => (
          <button
            key={option.type}
            className={"flex justify-center items-center space-x-2 text-base font-medium bg-background rounded-full h-12 px-3.5 ".concat(
              selectedDeliveryMode === option.type
                ? "border border-primary text-primary"
                : ""
            )}
            onClick={() => setSelectedDeliveryMode(option.type)}
          >
            {option.icon}
            <span>{option.name}</span>
          </button>
        ))}
      </div>
      <HorizontalDivider />
      {selectedDeliveryMode === "shipping" ? (
        <ShippingAddressSummary />
      ) : (
        <Suspense fallback={<StationSkeleton />}>
          <SelectedStationSummary />
        </Suspense>
      )}
    </Section>
  );
}

export default Delivery;
