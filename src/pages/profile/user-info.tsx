import { UserInfoSkeleton } from "@/components/skeleton";
import TransitionLink from "@/components/transition-link";
import { loadableUserInfoState } from "@/state";
import { useAtomValue } from "jotai";
import { PropsWithChildren } from "react";
import { Button, Icon } from "zmp-ui";
// import Register from "./register"; <-- Đã xóa import không cần thiết

function UserInfo({ children }: PropsWithChildren) {
  const userInfo = useAtomValue(loadableUserInfoState);

  // Trường hợp 1: Đang tải thông tin
  if (userInfo.state === "loading") {
    return <UserInfoSkeleton />;
  }

  // Trường hợp 2: Đã có thông tin người dùng (đã đăng nhập)
  if (userInfo.state === "hasData" && userInfo.data) {
    const { name, avatar, phone } = userInfo.data;
    return (
      <>
        <div className="bg-section rounded-lg p-4 flex items-center space-x-4 border-[0.5px] border-black/15">
          <img className="rounded-full h-10 w-10" src={avatar} />
          <div className="space-y-0.5 flex-1 overflow-hidden">
            <div className="text-lg truncate">{name}</div>
            <div className="text-sm text-subtitle truncate">{phone}</div>
          </div>
          <TransitionLink to="/profile/edit">
            <Icon icon="zi-edit-text" />
          </TransitionLink>
        </div>
        {children}
      </>
    );
  }

  // Trường hợp 3: Không có thông tin (chưa đăng nhập) -> Hiển thị nút Đăng nhập
  return (
    <div className="bg-section rounded-lg p-4 flex flex-col items-center space-y-2 border-[0.5px] border-black/15">
      <p className="text-center">Vui lòng đăng nhập để xem thông tin và nhận ưu đãi!</p>
      <TransitionLink to="/login" className="w-full">
        <Button fullWidth>
          Đăng nhập / Đăng ký
        </Button>
      </TransitionLink>
    </div>
  );
}

export default UserInfo;