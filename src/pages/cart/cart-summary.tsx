// src/pages/cart/cart-summary.tsx

import React from 'react';
import { useAtomValue } from 'jotai';
import { cartTotalState, selectedVoucherState } from '@/state';
import { formatPrice } from '@/utils/format';
import { Box } from 'zmp-ui';
import HorizontalDivider from '@/components/horizontal-divider';

const CartSummary: React.FC = () => {
  const { totalItems, totalAmount, finalAmount } = useAtomValue(cartTotalState);
  const selectedVoucher = useAtomValue(selectedVoucherState);

  return (
    <Box className="p-4 space-y-3">
      {/* SỬA LỖI: Thay thế Text.Header bằng div với class tương ứng */}
      <div className="text-lg font-semibold">
        Tổng cộng ({totalItems} sản phẩm)
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Tạm tính</span>
          <span>{formatPrice(totalAmount)}</span>
        </div>
        {selectedVoucher && (
          <div className="flex justify-between text-primary">
            <span>Giảm giá</span>
            <span>
              - {selectedVoucher.type === 'FIXED_AMOUNT'
                ? formatPrice(selectedVoucher.value)
                : `${selectedVoucher.value}%`}
            </span>
          </div>
        )}
      </div>
      
      <HorizontalDivider />
      
      <div className="flex justify-between font-semibold">
        <span>Thành tiền</span>
        {/* SỬA LỖI: Thay thế Text bằng span với class tương ứng */}
        <span className="text-primary">{formatPrice(finalAmount)}</span>
      </div>
    </Box>
  );
};

export default CartSummary;