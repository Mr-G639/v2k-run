import { useNavigate } from "react-router-dom";
import { Button, Input } from "zmp-ui";
import TransitionLink from "@/components/transition-link";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleRegister = () => {
    // Logic xử lý đăng ký sẽ được thêm ở đây
    console.log("Đăng ký thành công!");
    // Sau khi đăng ký, chuyển về trang đăng nhập
    navigate("/login");
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold mb-6">Đăng ký tài khoản</h1>
      <div className="w-full space-y-4">
        <Input
          type="text"
          placeholder="Nhập họ và tên"
        />
        <Input
          type="text"
          placeholder="Nhập số điện thoại"
        />
        <Input
          type="password"
          placeholder="Nhập mật khẩu"
        />
      </div>
      <Button onClick={handleRegister} fullWidth className="mt-6">
        Đăng ký
      </Button>
      <p className="mt-4 text-sm">
        Đã có tài khoản?{" "}
        <TransitionLink to="/login" className="text-primary font-medium">
          Đăng nhập
        </TransitionLink>
      </p>
    </div>
  );
}