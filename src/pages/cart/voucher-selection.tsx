// src/pages/cart/voucher-selection.tsx

import { selectedVoucherState, userVouchersState } from "@/state";
import { Voucher } from "@/types";
import { useAtom, useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { Box, Header, Icon, Page, Text } from "zmp-ui";
import VoucherItem from "../profile/voucher-item";

const VoucherSelectionPage = () => {
  const navigate = useNavigate();
  const availableVouchers = useAtomValue(userVouchersState);
  const [selectedVoucher, setSelectedVoucher] = useAtom(selectedVoucherState);

  const handleSelectVoucher = (voucher: Voucher) => {
    if (selectedVoucher?.id === voucher.id) {
      setSelectedVoucher(undefined); // Bỏ chọn nếu nhấn lại voucher đã chọn
    } else {
      setSelectedVoucher(voucher);
    }
    navigate(-1);
  };

  return (
    <Page className="flex flex-col">
      <Header title="Chọn voucher" showBackIcon />
      <Box className="flex-1 overflow-y-auto p-4 space-y-4">
        {availableVouchers.length > 0 ? (
          availableVouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="relative"
              onClick={() => handleSelectVoucher(voucher)}
            >
              <VoucherItem voucher={voucher} />
              {selectedVoucher?.id === voucher.id && (
                <Box className="absolute top-2 right-2 bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center">
                  <Icon icon="zi-check" />
                </Box>
              )}
            </div>
          ))
        ) : (
          <Text className="text-center text-gray-500">
            Bạn không có voucher nào.
          </Text>
        )}
      </Box>
    </Page>
  );
};

export default VoucherSelectionPage;