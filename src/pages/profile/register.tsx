import { useRequestInformation } from "@/hooks/useUser";
import registerIllusRight from "@/static/register-illus-right.svg";

export default function Register() {
  const requestInfo = useRequestInformation();

  return (
    <button
      className="w-full text-left rounded-lg bg-primary text-white p-4 bg-cover space-y-0.5"
      style={{
        backgroundImage: `url(${registerIllusRight})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom right",
        backgroundSize: "auto",
      }}
      onClick={requestInfo}
    >
      <div className="text-lg">Đăng ký thành viên</div>
      <div className="text-2xs">Đăng ký thành viên để nhận nhiều ưu đãi</div>
    </button>
  );
}
