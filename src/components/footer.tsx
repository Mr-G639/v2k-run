import { CartIcon, CategoryIcon, HomeIcon } from "./vectors"; // SỬA LỖI: Đã xóa 'PackageIcon'
import HorizontalDivider from "./horizontal-divider";
import { useAtomValue } from "jotai";
import { cartState } from "@/state";
import TransitionLink from "./transition-link";
import { useRouteHandle } from "@/hooks/useUtility";
import Badge from "./badge";

// Định nghĩa kiểu dữ liệu cho props của icon
type IconProps = {
  active: boolean;
};

const NAV_ITEMS = [
  {
    name: "Trang chủ",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Flash Sale",
    path: "/flash-sale",
    icon: CategoryIcon,
  },
  {
    name: "Giỏ hàng",
    path: "/cart",
    icon: (props: IconProps) => { // SỬA LỖI: Thêm kiểu dữ liệu cho 'props'
      const cart = useAtomValue(cartState);

      return (
        <Badge value={cart.length}>
          <CartIcon {...props} />
        </Badge>
      );
    },
  },
];

export default function Footer() {
  const [handle] = useRouteHandle();

  if (!handle?.noFooter) {
    return (
      <>
        <HorizontalDivider />
        <div
          className="w-full px-4 pt-2 grid pb-sb"
          style={{
            gridTemplateColumns: `repeat(${NAV_ITEMS.length}, 1fr)`,
          }}
        >
          {NAV_ITEMS.map((item) => {
            return (
              <TransitionLink
                to={item.path}
                key={item.path}
                replace
                className="flex flex-col items-center space-y-0.5 p-1 pb-0.5 cursor-pointer active:scale-105"
              >
                {({ isActive }) => (
                  <>
                    <div className="w-6 h-6 flex justify-center items-center">
                      <item.icon active={isActive} />
                    </div>
                    <div
                      className={`text-2xs ${isActive ? "text-primary" : ""}`}
                    >
                      {item.name}
                    </div>
                  </>
                )}
              </TransitionLink>
            );
          })}
        </div>
      </>
    );
  }

  // SỬA LỖI: Trả về null nếu không hiển thị footer
  return null;
}