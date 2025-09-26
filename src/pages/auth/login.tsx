import { useNavigate } from "react-router-dom";
import { Button, Input } from "zmp-ui";
import TransitionLink from "@/components/transition-link";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Logic xử lý đăng nhập sẽ được thêm ở đây
    console.log("Đăng nhập thành công!");
    // Sau khi đăng nhập, chuyển về trang chủ
    navigate("/");
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-6">Đăng nhập</h1>
      <div className="w-full space-y-4">
        <Input
          type="text"
          placeholder="Nhập số điện thoại hoặc email"
        />
        <Input
          type="password"
          placeholder="Nhập mật khẩu"
        />
      </div>
      <Button onClick={handleLogin} fullWidth className="mt-6">
        Đăng nhập
      </Button>
      <p className="mt-4 text-sm">
        Chưa có tài khoản?{" "}
        <TransitionLink to="/register" className="text-primary font-medium">
          Đăng ký ngay
        </TransitionLink>
      </p>
    </div>
  );
}