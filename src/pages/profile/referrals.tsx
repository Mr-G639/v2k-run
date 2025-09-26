import { referralOrdersState } from "@/state";
import { useAtomValue } from "jotai";
import { Box } from "zmp-ui";
import ReferralOrderItem from "./referral-order-item";

const ReferralOrdersPage = () => {
  const referralOrders = useAtomValue(referralOrdersState);

  return (
    // --- THAY ĐỔI TẠI ĐÂY: Thay thế <Page> bằng <div> ---
    <div className="flex flex-col bg-gray-100 h-full">
      <Box className="p-4 space-y-4 flex-1 overflow-y-auto">
        {referralOrders.map(order => (
          <ReferralOrderItem key={order.id} order={order} />
        ))}
      </Box>
    </div>
  );
};

export default ReferralOrdersPage;