import { HomeIcon, LocationMarkerLineIcon } from "@/components/vectors";
import { Order } from "@/types";
import { Icon, List } from "zmp-ui";
import DeliverySummary from "../cart/delivery-summary";

function OrderInfo(props: { order: Order }) {
  return (
    <List noSpacing className="bg-section rounded-lg">
      {props.order.delivery.type === "pickup" ? (
        <DeliverySummary
          icon={<HomeIcon />}
          title="Giao đến"
          subtitle={props.order.delivery.name}
          description={props.order.delivery.address}
        />
      ) : (
        <DeliverySummary
          icon={<LocationMarkerLineIcon />}
          title="Giao đến"
          subtitle={props.order.delivery.alias}
          description={props.order.delivery.address}
        />
      )}
      {props.order.note && (
        <List.Item prefix={<Icon icon="zi-note" />} title="Ghi chú">
          <span className="text-xs text-inactive">{props.order.note}</span>
        </List.Item>
      )}
    </List>
  );
}

export default OrderInfo;
