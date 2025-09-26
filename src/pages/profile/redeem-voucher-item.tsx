import { redeemableVouchersState, userPointsState, userVouchersState } from "@/state";
import { Voucher } from "@/types";
import { useAtom, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { Box, Button, Text } from "zmp-ui";

interface RedeemableVoucher {
  id: number;
  pointsCost: number;
  voucher: Voucher;
}

const RedeemVoucherItem = ({ item }: { item: RedeemableVoucher }) => {
  const [userPoints, setUserPoints] = useAtom(userPointsState);
  const setUserVouchers = useSetAtom(userVouchersState);

  const handleRedeem = () => {
    if (userPoints < item.pointsCost) {
      toast.error("Bạn không đủ điểm để đổi voucher này!");
      return;
    }

    // Trừ điểm và thêm voucher
    setUserPoints((currentPoints) => currentPoints - item.pointsCost);
    setUserVouchers((currentVouchers) => [...currentVouchers, item.voucher]);

    toast.success(`Đổi thành công voucher "${item.voucher.title}"!`);
  };

  return (
    <Box className="bg-white p-4 rounded-lg space-y-3">
      <Text size="large" bold>{item.voucher.title}</Text>
      <Text size="small" className="text-gray-500">{item.voucher.description}</Text>
      <div className="flex justify-between items-center">
        <Text size="large" bold className="text-primary">{item.pointsCost} điểm</Text>
        <Button
          size="small"
          onClick={handleRedeem}
          disabled={userPoints < item.pointsCost}
        >
          Đổi voucher
        </Button>
      </div>
    </Box>
  );
};

export default RedeemVoucherItem;