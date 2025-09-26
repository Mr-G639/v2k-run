import { Voucher } from "@/types";
import { Box, Text } from "zmp-ui";

const VoucherItem = ({ voucher }: { voucher: Voucher }) => {
  const getVoucherColor = () => {
    switch (voucher.type) {
      case "SHIPPING":
        return "bg-green-500";
      case "PERCENT":
        return "bg-blue-500";
      case "FIXED_AMOUNT":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Box className="flex items-center space-x-4 bg-white p-3 rounded-lg shadow-sm">
      <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-white font-bold text-lg ${getVoucherColor()}`}>
        {voucher.type === "PERCENT" ? `${voucher.value}%` : "FREE"}
      </div>
      <div className="flex-1">
        <Text size="large" bold>{voucher.title}</Text>
        <Text size="small" className="text-gray-500">{voucher.description}</Text>
        <Text size="xSmall" className="text-gray-400 mt-1">HSD: {new Date(voucher.expiryDate).toLocaleDateString("vi-VN")}</Text>
      </div>
    </Box>
  );
};

export default VoucherItem;