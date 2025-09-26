import { userBankInfoState } from "@/state";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Box, Button, Header, Input, Page } from "zmp-ui";

const BankInfoPage = () => {
  const navigate = useNavigate();
  const [bankInfo, setBankInfo] = useAtom(userBankInfoState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newBankInfo = {
      bankName: formData.get('bankName') as string,
      accountHolder: formData.get('accountHolder') as string,
      accountNumber: formData.get('accountNumber') as string,
    };
    setBankInfo(newBankInfo);
    toast.success("Đã lưu thông tin tài khoản");
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <Page className="flex flex-col">
      <Header title="Thông tin thanh toán" showBackIcon />
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between">
        <Box className="p-4 space-y-4">
          <Input
            label="Tên ngân hàng"
            name="bankName"
            placeholder="Ví dụ: Vietcombank"
            defaultValue={bankInfo?.bankName}
            required
          />
          <Input
            label="Tên chủ tài khoản"
            name="accountHolder"
            placeholder="Tên in trên thẻ"
            defaultValue={bankInfo?.accountHolder}
            required
          />
          <Input
            label="Số tài khoản"
            name="accountNumber"
            placeholder="Nhập số tài khoản"
            defaultValue={bankInfo?.accountNumber}
            required
          />
        </Box>
        <Box className="p-4">
          <Button fullWidth htmlType="submit">Lưu thông tin</Button>
        </Box>
      </form>
    </Page>
  );
};

export default BankInfoPage;