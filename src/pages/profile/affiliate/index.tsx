// src/pages/profile/affiliate/index.tsx

import { Page, Box, Text, Input, Button, Icon } from "zmp-ui";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAtomValue } from "jotai";
import { referralOrdersState, transactionsState, walletState } from "@/state";
import { formatPrice } from "@/utils/format";
import { useNavigate } from "react-router-dom";
import ReferralOrderItem from "../referral-order-item";
import { useState } from "react"; // <<< THÊM IMPORT NÀY

// --- (Các Giao diện Register và Pending giữ nguyên) ---

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập họ và tên"),
  phone: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
});
type FormData = z.infer<typeof schema>;

const AffiliateRegisterView = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", phone: "", email: "" },
  });

  const onSubmit = (data: FormData) => {
    console.log("Đăng ký AFF 1 Click:", data);
  };

  return (
    <Box className="p-4">
      <Text.Title className="text-center mb-4">Đăng ký AFF 1 Click</Text.Title>
      <Text className="text-center mb-6">
        Trở thành đối tác của chúng tôi và kiếm tiền bằng cách chia sẻ sản phẩm.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <Input
              label="Họ và tên"
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              errorText={errors.name?.message}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <Input
              label="Số điện thoại"
              type="text"
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              errorText={errors.phone?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              label="Email"
              type="text"
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              errorText={errors.email?.message}
            />
          )}
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Đang gửi..." : "Đăng ký"}
        </button>
      </form>
      <Text size="xSmall" className="text-center text-gray-500 mt-4">
        Sau khi đăng ký, yêu cầu của bạn sẽ được gửi đến quản trị viên để xét duyệt.
      </Text>
    </Box>
  );
};

const AffiliatePendingView = () => (
  <Box className="p-4 m-4 text-center bg-white rounded-lg">
    <Icon icon="zi-clock-1" className="text-primary" size={48} />
    <Text.Title className="mt-4">Yêu cầu đang chờ duyệt</Text.Title>
    <Text className="mt-2 text-gray-600">
      Yêu cầu tham gia chương trình AFF 1 Click của bạn đã được gửi. Chúng tôi sẽ thông báo cho bạn ngay khi có kết quả.
    </Text>
  </Box>
);

// --- Giao diện 3: Cập nhật trang tổng quan với Tab hoạt động ---
const AffiliateDashboardView = () => {
  const navigate = useNavigate();
  const { availableBalance, pendingBalance } = useAtomValue(walletState);
  const transactions = useAtomValue(transactionsState);
  const referralOrders = useAtomValue(referralOrdersState);
  
  // State để quản lý tab đang hoạt động
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="flex flex-col h-full bg-gray-100">
        {/* Box thông tin số dư */}
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

        {/* Tab chuyển đổi */}
        <Box className="m-4 mt-0 bg-white rounded-lg p-2 flex space-x-2">
            <Button 
              className={`flex-1 ${activeTab === 'transactions' ? 'bg-primary text-white' : ''}`} 
              variant="secondary" 
              onClick={() => setActiveTab('transactions')}
            >
              Lịch sử giao dịch
            </Button>
            <Button 
              className={`flex-1 ${activeTab === 'referrals' ? 'bg-primary text-white' : ''}`} 
              variant="secondary" 
              onClick={() => setActiveTab('referrals')}
            >
              Đơn giới thiệu
            </Button>
        </Box>

        {/* Nội dung tương ứng với tab */}
        <Box className="flex-1 overflow-y-auto bg-white m-4 mt-0 rounded-lg p-4">
            {activeTab === 'transactions' && (
              <div className="space-y-2">
                {transactions.map(tx => (
                  <div key={tx.id} className="flex items-center p-2 space-x-4 border-b last:border-b-0">
                    <Icon icon={tx.type === 'WITHDRAWAL' ? 'zi-arrow-down' : 'zi-arrow-up'} className={`p-2 rounded-full ${tx.type === 'WITHDRAWAL' ? 'bg-red-200 text-red-600' : 'bg-green-200 text-green-600'}`} />
                    <div className="flex-1">
                      <Text>{tx.description}</Text>
                      <Text size="xSmall" className="text-gray-500">{new Date(tx.date).toLocaleString('vi-VN')}</Text>
                    </div>
                    <div className="text-right">
                      <Text bold className={tx.amount > 0 ? 'text-green-600' : ''}>{formatPrice(tx.amount)}</Text>
                      <Text size="small" className={tx.status === 'COMPLETED' ? 'text-green-600' : 'text-amber-600'}>{tx.status === 'PENDING' ? 'Đang chờ' : 'Thành công'}</Text>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="space-y-4">
                {referralOrders.map(order => (
                  <ReferralOrderItem key={order.id} order={order} />
                ))}
              </div>
            )}
        </Box>
    </div>
  );
};

 // Trang chính của AFF 1 Click
 const AffiliatePage = () => {
   const [affiliateStatus] = useState<'unregistered' | 'pending' | 'approved'>('approved');
 
   return (
     <Page>
       {affiliateStatus === "unregistered" && <AffiliateRegisterView />}
       {affiliateStatus === "pending" && <AffiliatePendingView />}
       {affiliateStatus === "approved" && <AffiliateDashboardView />}
     </Page>
   );
 };
 
 export default AffiliatePage;