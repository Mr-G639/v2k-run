// src/pages/profile/wallet.tsx

import { referralOrdersState, transactionsState, walletState } from "@/state";
import { Transaction } from "@/types";
import { formatPrice } from "@/utils/format";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { Box, Button, Icon, Page, Text } from "zmp-ui";

const TransactionIcon = ({ type }: { type: Transaction['type'] }) => {
  if (type === 'WITHDRAWAL') {
    return <Icon icon="zi-arrow-down" className="bg-red-200 text-red-600 p-2 rounded-full" />;
  }
  return <Icon icon="zi-arrow-up" className="bg-green-200 text-green-600 p-2 rounded-full" />;
}

const TransactionStatus = ({ status }: { status: Transaction['status'] }) => {
  if (status === 'PENDING') {
    return <Text size="small" className="text-amber-600">Đang chờ duyệt</Text>;
  }
  if (status === 'REJECTED') {
    return <Text size="small" className="text-red-600">Bị từ chối</Text>;
  }
  return <Text size="small" className="text-green-600">Thành công</Text>;
}

const WalletPage = () => {
  const navigate = useNavigate();
  const { availableBalance, pendingBalance } = useAtomValue(walletState);
  const transactions = useAtomValue(transactionsState);
  const referralOrders = useAtomValue(referralOrdersState);

  const handleTransactionClick = (tx: Transaction) => {
    if (tx.type === 'COMMISSION' && tx.referralId) {
      const relatedOrder = referralOrders.find(o => o.id === tx.referralId);
      if (relatedOrder) {
        navigate(`/profile/referrals/${tx.referralId}`, { state: relatedOrder });
      }
    } else if (tx.type === 'WITHDRAWAL') {
      navigate(`/profile/transaction/${tx.id}`, { state: tx });
    }
  };

  return (
    // --- THAY ĐỔI TẠI ĐÂY: Thay thế <div> bằng <Page> ---
    <Page className="flex flex-col bg-gray-100 h-full">
      <Box className="m-4 p-4 bg-primary text-white rounded-lg text-center space-y-2">
        <Text>Số dư khả dụng</Text>
        <Text size="xLarge" bold>{formatPrice(availableBalance)}</Text>
        <Text size="small" className="opacity-80">Số dư tạm giữ: {formatPrice(pendingBalance)}</Text>
        <Button 
          fullWidth 
          className="!bg-white !text-primary mt-4"
          onClick={() => navigate('/profile/withdrawal')}
        >
          Rút tiền
        </Button>
      </Box>

      <Box className="flex-1 overflow-y-auto bg-white m-4 mt-0 rounded-lg">
        <Text bold className="p-4">Lịch sử giao dịch</Text>
        <div className="space-y-2">
          {transactions.map(tx => (
            <div 
              key={tx.id}
              className="flex items-center p-4 space-x-4 border-t cursor-pointer"
              onClick={() => handleTransactionClick(tx)}
            >
              <TransactionIcon type={tx.type} />
              <div className="flex-1">
                <Text>{tx.description}</Text>
                <Text size="xSmall" className="text-gray-500">
                  {new Date(tx.date).toLocaleString('vi-VN')}
                </Text>
              </div>
              <div className="text-right">
                <Text bold className={tx.amount > 0 ? 'text-green-600' : ''}>
                  {formatPrice(tx.amount)}
                </Text>
                <TransactionStatus status={tx.status} />
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Page>
  );
};

export default WalletPage;