import { transactionsState, userBankInfoState, walletState } from "@/state";
import { formatPrice } from "@/utils/format";
import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Button, Header, Input, Page, Text } from "zmp-ui";

const WithdrawalPage = () => {
  const navigate = useNavigate();
  const { availableBalance } = useAtomValue(walletState);
  const bankInfo = useAtomValue(userBankInfoState);
  const setTransactions = useSetAtom(transactionsState);
  const [amount, setAmount] = useState(0);

  const handleWithdraw = () => {
    if (amount <= 0 || amount > availableBalance) {
      toast.error("Số tiền không hợp lệ!");
      return;
    }

    // Trong thực tế, bạn sẽ gọi API đến backend ở đây để tạo lệnh rút tiền
    // Ở đây chúng ta chỉ giả lập bằng cách thêm một giao dịch mới
    const newWithdrawal = {
      id: `txn_${Math.random()}`,
      type: 'WITHDRAWAL' as const,
      amount: -amount,
      status: 'PENDING' as const, // Trạng thái chờ admin xử lý
      date: new Date().toISOString(),
      description: `Rút tiền về ${bankInfo?.bankName}`,
    };

    setTransactions(current => [...current, newWithdrawal]);
    toast.success("Đã gửi yêu cầu rút tiền!");
    navigate('/profile/wallet');
  };

  return (
    <Page className="flex flex-col">
      <Header title="Tạo lệnh rút tiền" showBackIcon />
      <Box className="p-4 flex-1">
        <Text className="text-gray-500">Số dư khả dụng: {formatPrice(availableBalance)}</Text>
        <Input
          type="number"
          label="Số tiền cần rút"
          placeholder="Nhập số tiền"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-4"
        />
      </Box>
      <Box className="p-4">
        <Button fullWidth onClick={handleWithdraw}>Xác nhận rút tiền</Button>
      </Box>
    </Page>
  );
};

export default WithdrawalPage;