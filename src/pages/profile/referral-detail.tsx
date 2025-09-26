import { ReferralOrder } from "@/types";
import { formatPrice } from "@/utils/format";
import { useLocation } from "react-router-dom";
import { Box, Header, Page, Text } from "zmp-ui";

const DetailRow = ({ label, value }: { label: string, value: string | number }) => (
  <Box className="flex justify-between items-center py-2">
    <Text className="text-gray-500">{label}</Text>
    <Text bold>{value}</Text>
  </Box>
);

const ReferralDetailPage = () => {
  const { state } = useLocation();
  const order = state as ReferralOrder;

  return (
    <Page className="flex flex-col bg-gray-100">
      <Header title="Chi tiết hoa hồng" showBackIcon />
      <Box className="m-4 p-4 bg-white rounded-lg space-y-2">
        <DetailRow label="Mã đơn hàng" value={order.orderId} />
        <DetailRow label="Khách hàng" value={order.customerName} />
        <DetailRow label="Ngày tạo" value={new Date(order.date).toLocaleString('vi-VN')} />
        <hr/>
        <DetailRow label="Giá trị đơn" value={formatPrice(order.totalAmount)} />
        <DetailRow label="Tỷ lệ hoa hồng" value={`${order.commissionRate}%`} />
        <DetailRow label="Tiền hoa hồng" value={formatPrice(order.commissionAmount)} />
        <hr/>
        <DetailRow label="Trạng thái thanh toán" value={order.paymentStatus === 'success' ? 'Thành công' : 'Chưa hoàn tất'} />
        <DetailRow label="Trạng thái hoa hồng" value={order.commissionStatus} />
        <hr/>
        <Box className="pt-2">
          <Text className="text-gray-500">Link đã chia sẻ</Text>
          {/* Sửa lại bằng thẻ input để có thể chọn và sao chép */}
          <input
            type="text"
            readOnly
            className="w-full bg-gray-100 p-2 rounded-md text-blue-600 text-xs mt-1 outline-none"
            value={order.sharedLink}
            onClick={(e) => e.currentTarget.select()}
          />
        </Box>
      </Box>
    </Page>
  );
};

export default ReferralDetailPage;