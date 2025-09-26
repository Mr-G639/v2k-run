import CONFIG from "@/config";
import { userInfoKeyState, userInfoState } from "@/state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "zmp-ui";

function ProfileEditorPage() {
  const navigate = useNavigate();
  const userInfo = useAtomValue(userInfoState);
  const setUserInfoKey = useSetAtom(userInfoKeyState);
  const refreshUserInfo = () => setUserInfoKey((key) => key + 1);

  return (
    <form
      className="h-full flex flex-col justify-between"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newUserInfo = { ...userInfo };
        data.forEach((value, key) => {
          newUserInfo[key] = value;
        });
        localStorage.setItem(
          CONFIG.STORAGE_KEYS.USER_INFO,
          JSON.stringify(newUserInfo)
        );
        refreshUserInfo();
        toast.success("Đã cập nhật thông tin tài khoản");
        navigate(-1);
      }}
    >
      <div className="bg-section p-4 grid gap-4">
        <Input name="name" label="Họ tên" defaultValue={userInfo?.name} />
        <Input
          name="phone"
          label="Số điện thoại"
          required
          defaultValue={userInfo?.phone}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Email"
          defaultValue={userInfo?.email}
        />
        <Input
          name="address"
          label="Địa chỉ"
          placeholder="Nhập dịa chỉ"
          defaultValue={userInfo?.address}
        />
      </div>
      <div className="p-6 pt-4 bg-section">
        <Button htmlType="submit" fullWidth>
          Lưu thay đổi
        </Button>
      </div>
    </form>
  );
}

export default ProfileEditorPage;
