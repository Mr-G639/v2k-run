import { ReferralOrder } from "@/types";
import { formatPrice } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "zmp-ui";

const ReferralOrderItem = ({ order }: { order: ReferralOrder }) => {
  const navigate = useNavigate();

  return (
    <Box
      className="bg-white p-4 rounded-lg shadow-sm"
      onClick={() => navigate(`/profile/referrals/${order.id}`, { state: order })}
    >
      <div className="flex justify-between items-center">
        <Text size="large" bold>{order.orderId}</Text>
        <Text size="small" className="text-gray-500">
          {new Date(order.date).toLocaleDateString('vi-VN')}
        </Text>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <Text size="small" className="text-gray-500">Tổng đơn</Text>
          <Text bold>{formatPrice(order.totalAmount)}</Text>
        </div>
        <div className="text-right">
          <Text size="small" className="text-gray-500">Hoa hồng ({order.commissionRate}%)</Text>
          <Text bold className="text-green-600">+{formatPrice(order.commissionAmount)}</Text>
        </div>
      </div>
    </Box>
  );
};

export default ReferralOrderItem;