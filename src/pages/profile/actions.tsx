// src/pages/profile/actions.tsx

// --- SỬA LỖI 1: Xóa 'OrderHistoryIcon' không được sử dụng ---
import { HeartIcon, VoucherIcon } from "@/components/vectors";
import { useNavigate } from "react-router-dom";
import { Icon, List } from "zmp-ui";

export default function ProfileActions() {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg border-[0.5px] border-black/15">
      <List>

        /
        <List.Item
          title="Sản phẩm yêu thích"
          prefix={<HeartIcon className="w-5 h-5" />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => navigate("/profile/wishlist")}
        />
        <List.Item
          title="Ví Voucher"
          prefix={<VoucherIcon />}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => navigate("/profile/vouchers")}
        />
        {/* --- SỬA LỖI 2: Thay 'zi-wallet' bằng icon hợp lệ --- */}
        <List.Item
          title="AFF 1 Click"
          prefix={<span className="w-5 h-5"><VoucherIcon /></span>}
          suffix={<Icon icon="zi-chevron-right" />}
          onClick={() => navigate("/profile/affiliate")}
        />
      </List>
    </div>
  );
}