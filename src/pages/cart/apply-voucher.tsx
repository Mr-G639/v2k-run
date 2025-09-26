// src/pages/cart/apply-voucher.tsx

import Section from "@/components/section";
import { VoucherIcon } from "@/components/vectors";
import { selectedVoucherState } from "@/state";
import { formatPrice } from "@/utils/format";
import { useAtomValue } from "jotai";
import { useNavigate } from "react-router-dom";
import { Icon } from "zmp-ui";

export default function ApplyVoucher() {
  const navigate = useNavigate();
  const selectedVoucher = useAtomValue(selectedVoucherState);

  return (
    <Section title="Mã giảm giá" className="rounded-lg">
      <button
        className="w-full flex justify-between items-center py-2 px-4 space-x-2 cursor-pointer"
        onClick={() => navigate("/vouchers")}
      >
        <div className="flex items-center space-x-2">
          <VoucherIcon />
          <div className="text-sm flex-1">
            {selectedVoucher ? selectedVoucher.title : "Chọn voucher"}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          {selectedVoucher && (
            <div className="text-sm font-medium text-red-500">
              - {formatPrice(selectedVoucher.value)}
            </div>
          )}
          <Icon icon="zi-chevron-right" />
        </div>
      </button>
    </Section>
  );
}