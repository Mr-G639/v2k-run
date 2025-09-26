// src/components/empty.tsx (Sau khi sửa)

import { EmptyBoxIcon, EmptyCartIcon, HeartIcon, SearchIconLarge } from "./vectors";

export function EmptySearchResult() {
  return (
    <div className="flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <SearchIconLarge />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm bạn tìm kiếm
      </div>
    </div>
  );
}

export function EmptyCategory() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <EmptyBoxIcon />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm trong danh mục này
      </div>
    </div>
  );
}

export function EmptyOrder() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <EmptyBoxIcon />
      <div className="text-inactive text-center text-2xs">
        Hiện tại bạn chưa có đơn hàng nào
      </div>
    </div>
  );
}

export function EmptyCart() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      <EmptyCartIcon />
      <div className="text-inactive text-center text-2xs">
        Không có sản phẩm trong giỏ hàng
      </div>
    </div>
  );
}

export function EmptyWishlist() {
  return (
    <div className="h-full flex-1 p-6 space-y-4 flex flex-col items-center justify-center">
      {/* Cải thiện: Tăng kích thước và đổi màu icon cho nhất quán */}
      <HeartIcon className="w-20 h-20 text-gray-300" />
      <div className="text-inactive text-center text-2xs">
        Bạn chưa có sản phẩm yêu thích nào
      </div>
    </div>
  );
}