import { Transaction } from "@/types";
import { formatPrice } from "@/utils/format";
import { useLocation } from "react-router-dom";
import { Box, Header, Page, Text } from "zmp-ui";

const DetailRow = ({ label, value }: { label: string, value: string | number }) => (
  <Box className="flex justify-between items-center py-2">
    <Text className="text-gray-500">{label}</Text>
    <Text bold>{value}</Text>
  </Box>
);

const WithdrawalDetailPage = () => {
  const { state } = useLocation();
  const transaction = state as Transaction;

  const getStatusText = (status: Transaction['status']) => {
    if (status === 'PENDING') return 'Đang chờ xử lý';
    if (status === 'REJECTED') return 'Bị từ chối';
    return 'Thành công';
  }

  return (
    <Page className="flex flex-col bg-gray-100">
      <Header title="Chi tiết rút tiền" showBackIcon />
      <Box className="m-4 p-4 bg-white rounded-lg space-y-2">
        <DetailRow label="Mã giao dịch" value={transaction.id} />
        <DetailRow label="Ngày tạo" value={new Date(transaction.date).toLocaleString('vi-VN')} />
        <hr/>
        <DetailRow label="Số tiền" value={formatPrice(transaction.amount)} />
        <DetailRow label="Nội dung" value={transaction.description} />
        <DetailRow label="Trạng thái" value={getStatusText(transaction.status)} />
      </Box>
    </Page>
  );
};

export default WithdrawalDetailPage;