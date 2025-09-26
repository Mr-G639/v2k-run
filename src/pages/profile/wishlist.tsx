// src/pages/profile/wishlist.tsx

import { EmptyWishlist } from "@/components/empty";
import ProductGrid from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/skeleton";
import { favoriteProductsDetailsState } from "@/state";
import { useAtomValue } from "jotai";
import { Suspense } from "react";
// Sửa đổi: Xóa Header và thay Page bằng một thẻ div đơn giản
// import { Page } from "zmp-ui"; <--- Dòng này đã được xóa

const Wishlist = () => {
    const favoriteProducts = useAtomValue(favoriteProductsDetailsState);

    if (favoriteProducts.length === 0) {
        return <EmptyWishlist />;
    }

    return <ProductGrid products={favoriteProducts} />;
}

const WishlistPage = () => {
  return (
    // --- THAY ĐỔI TẠI ĐÂY: Thay thế <Page> bằng <div> ---
    <div className="flex flex-col h-full">
      {/* Dòng <Header ... /> đã được xóa */}
      <div className="flex-1 overflow-y-auto">
        <Suspense fallback={<ProductGridSkeleton />}>
            <Wishlist />
        </Suspense>
      </div>
    </div>
  );
};

export default WishlistPage;