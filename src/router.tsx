// src/router.tsx

import { createBrowserRouter, createRoutesFromElements, Route, Params } from "react-router-dom";
import { lazy } from "react";

// Utils & Layout
import Layout from "@/components/layout";
import { getBasePath } from "@/utils/zma";
import { Category } from "./types";

// Pages
const HomePage = lazy(() => import("@/pages/home"));
const CartPage = lazy(() => import("@/pages/cart"));
const CategoryDetailPage = lazy(() => import("@/pages/catalog/category-detail"));
const CategoryListPage = lazy(() => import("@/pages/catalog/category-list"));
const ProductDetailPage = lazy(() => import("@/pages/catalog/product-detail"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const OrdersPage = lazy(() => import("./pages/orders"));
const ShippingAddressPage = lazy(() => import("./pages/cart/shipping-address"));
const StationsPage = lazy(() => import("./pages/cart/stations"));
const OrderDetailPage = lazy(() => import("./pages/orders/detail"));
const ProfileEditorPage = lazy(() => import("./pages/profile/editor"));
const VouchersPage = lazy(() => import("./pages/profile/vouchers"));
const RedeemPage = lazy(() => import("./pages/profile/redeem"));
const BankInfoPage = lazy(() => import("./pages/profile/bank-info"));
const WithdrawalPage = lazy(() => import("./pages/profile/withdrawal"));
const WithdrawalDetailPage = lazy(() => import("./pages/profile/withdrawal-detail"));
const LoginPage = lazy(() => import("./pages/auth/login"));
const RegisterPage = lazy(() => import("./pages/auth/register"));
const VoucherSelectionPage = lazy(() => import("./pages/cart/voucher-selection"));
const WishlistPage = lazy(() => import("./pages/profile/wishlist"));
const ReviewsListPage = lazy(() => import("./pages/catalog/product-reviews/ReviewsListPage"));
const FlashSalePage = lazy(() => import("@/pages/flash-sale"));
const SearchPage = lazy(() => import("@/pages/search"));
const AffiliatePage = lazy(() =>
  import("./pages/profile/affiliate").then((m) => ({
    default: (m as any).default ?? (m as any).Affiliate ?? (m as any).AffiliatePage,
  }))
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* === CÁC TRANG CÓ HIỂN THỊ HEADER === */}
      <Route index element={<HomePage />} handle={{ search: true, noBack: true }} />
      <Route path="/product/:id" element={<ProductDetailPage />} handle={{ search: true, noFloatingCart: true }} />
      
      {/* SỬA LỖI: Thêm 'backTo: "/"' để nút back luôn về trang chủ */}
      <Route path="/cart" element={<CartPage />} handle={{ search: true, noFloatingCart: true, backTo: "/" }} />
      <Route path="/flash-sale" element={<FlashSalePage />} handle={{ search: true, backTo: "/" }} />

      {/* === CÁC TRANG BỊ ẨN HEADER === */}
      <Route path="/categories" element={<CategoryListPage />} handle={{ noHeader: true }} />
      <Route path="/category/:id" element={<CategoryDetailPage />} handle={{ noHeader: true, title: ({ categories, params }: { categories: Category[], params: Params<string> }) => categories.find((c) => String(c.id) === params.id)?.name } } />
      <Route path="/product/:id/reviews" element={<ReviewsListPage />} handle={{ noHeader: true }} />
      <Route path="/search" element={<SearchPage />} handle={{ noHeader: true }} />
      <Route path="/orders/:status?" element={<OrdersPage title="Đơn hàng">{null}</OrdersPage>} handle={{ noHeader: true }} />
      <Route path="/order/:id" element={<OrderDetailPage />} handle={{ noHeader: true }} />
      <Route path="/vouchers" element={<VoucherSelectionPage />} handle={{ noHeader: true }} />
      <Route path="/shipping-address" element={<ShippingAddressPage />} handle={{ noHeader: true }} />
      <Route path="/stations" element={<StationsPage />} handle={{ noHeader: true }} />
      <Route path="/profile" element={<ProfilePage />} handle={{ noHeader: true }} />
      <Route path="/profile/edit" element={<ProfileEditorPage />} handle={{ noHeader: true }} />
      <Route path="/profile/wishlist" element={<WishlistPage />} handle={{ noHeader: true }} />
      <Route path="/profile/vouchers" element={<VouchersPage />} handle={{ noHeader: true }} />
      <Route path="/profile/redeem" element={<RedeemPage />} handle={{ noHeader: true }} />
      <Route path="/profile/affiliate" element={<AffiliatePage />} handle={{ noHeader: true }} />
      <Route path="/profile/transaction/:id" element={<WithdrawalDetailPage />} handle={{ noHeader: true }} />
      <Route path="/profile/bank-info" element={<BankInfoPage />} handle={{ noHeader: true }} />
      <Route path="/profile/withdrawal" element={<WithdrawalPage />} handle={{ noHeader: true }} />
      <Route path="/login" element={<LoginPage />} handle={{ noHeader: true }} />
      <Route path="/register" element={<RegisterPage />} handle={{ noHeader: true }} />
    </Route>
  ),
  { basename: getBasePath() }
);

export default router;