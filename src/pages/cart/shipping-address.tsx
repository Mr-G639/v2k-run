import { shippingAddressState } from "@/state";
import { useAtom } from "jotai";
import { useResetAtom } from "jotai/utils";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Icon, Input } from "zmp-ui";

function ShippingAddressPage() {
  const [address, setAddress] = useAtom(shippingAddressState);
  const resetAddress = useResetAtom(shippingAddressState);
  const navigate = useNavigate();

  return (
    <form
      className="h-full flex flex-col justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newAddress = {};
        data.forEach((value, key) => {
          newAddress[key] = value;
        });
        setAddress(newAddress as typeof address);
        toast.success("Đã cập nhật địa chỉ");
        navigate(-1);
      }}
    >
      <div className="py-2 space-y-2">
        <div className="bg-section p-4 grid gap-4">
          <Input
            name="alias"
            label="Tên địa chỉ"
            placeholder="Ví dụ: công ty, trường học"
            defaultValue={address?.alias}
          />
          <Input
            name="address"
            label={
              <>
                Địa chỉ <span className="text-danger">*</span>
              </>
            }
            placeholder="Nhập địa chỉ"
            required
            defaultValue={address?.address}
            onInvalid={(e) => {
              e.currentTarget.setCustomValidity("Vui lòng nhập địa chỉ");
              e.currentTarget.reportValidity();
            }}
            onInput={(e) => {
              e.currentTarget.setCustomValidity("");
            }}
          />
        </div>
        <div className="bg-section p-4 grid gap-4">
          <Input
            name="name"
            label="Tên người nhận"
            placeholder="Nhập tên người nhận"
            defaultValue={address?.name}
          />
          <Input
            name="phone"
            label="Số điện thoại"
            placeholder="0912345678"
            defaultValue={address?.phone}
          />
        </div>
        <Button
          fullWidth
          className="!bg-section !text-danger !rounded-none"
          type="danger"
          prefixIcon={<Icon icon="zi-delete" />}
          onClick={() => {
            resetAddress();
            toast.success("Đã xóa địa chỉ");
            navigate(-1);
          }}
        >
          Xóa địa chỉ này
        </Button>
      </div>
      <div className="p-6 pt-4 bg-section">
        <Button htmlType="submit" fullWidth>
          Xong
        </Button>
      </div>
    </form>
  );
}

export default ShippingAddressPage;
