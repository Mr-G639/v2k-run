import { useAtomValue } from "jotai";
import { userVouchersState } from "@/state";
import { Box, Page, Tabs, Text } from "zmp-ui";
import VoucherItem from "./voucher-item";

const VouchersPage = () => {
  const vouchers = useAtomValue(userVouchersState);

  return (
    <Page className="flex flex-col bg-gray-100">
      <Tabs id="voucher-list" className="flex-1 flex flex-col">
        <Tabs.Tab key="available" label="Hiện có">
          <Box className="p-4 space-y-4">
            {/* Thêm kiểm tra nếu không có voucher */}
            {vouchers.length === 0 ? (
              <Text className="text-center text-gray-500">
                Bạn chưa có voucher nào. Hãy tích điểm để đổi voucher nhé!
              </Text>
            ) : (
              vouchers.map(voucher => (
                <VoucherItem key={voucher.id} voucher={voucher} />
              ))
            )}
          </Box>
        </Tabs.Tab>
        <Tabs.Tab key="used" label="Đã sử dụng">
          <Box className="p-4">
              <p className="text-center text-gray-500">Chưa có voucher nào đã sử dụng.</p>
          </Box>
        </Tabs.Tab>
      </Tabs>
    </Page>
  );
};

export default VouchersPage;