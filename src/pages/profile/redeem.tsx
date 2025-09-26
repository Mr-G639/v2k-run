import { redeemableVouchersState, userPointsState } from "@/state";
import { useAtomValue } from "jotai";
import { Box, Header, Page, Text } from "zmp-ui";
import RedeemVoucherItem from "./redeem-voucher-item";

const RedeemPage = () => {
  const userPoints = useAtomValue(userPointsState);
  const redeemableVouchers = useAtomValue(redeemableVouchersState);

  return (
    <Page className="flex flex-col bg-gray-100">
      <Header
        title="Đổi voucher"
        showBackIcon
      />
      <Box className="bg-primary text-white text-center p-4">
        <Text size="xLarge" bold>
          {userPoints}
        </Text>
        <Text>Điểm hiện tại của bạn</Text>
      </Box>
      <Box className="p-4 space-y-4 flex-1 overflow-y-auto">
        {redeemableVouchers.map(item => (
          <RedeemVoucherItem key={item.id} item={item} />
        ))}
      </Box>
    </Page>
  );
};

export default RedeemPage;