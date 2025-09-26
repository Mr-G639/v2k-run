// src/types.d.ts

// ==================================================================
// SECTION: NGƯỜI DÙNG & TÀI KHOẢN
// ==================================================================

/**
 * Đại diện cho thông tin của một người dùng đã đăng nhập.
 */
export interface UserInfo {
  id: string;
  name: string;
  avatar: string;
  phone: string;
  email: string;
  address: string;
}

/**
 * Thông tin tài khoản ngân hàng của người dùng để rút tiền.
 */
export interface UserBankInfo {
  bankName: string;
  accountHolder: string;
  accountNumber: string;
}


// ==================================================================
// SECTION: SẢN PHẨM & DANH MỤC
// ==================================================================

/**
 * Đại diện cho một sản phẩm trong cửa hàng.
 */
export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  video?: string;
  category: Category;
  detail?: string;
  soldCount?: number;
  // Bổ sung thuộc tính sale để chứa thông tin khuyến mãi
  sale?: {
    isFlashSale: boolean;
  };
}

/**
 * Đại diện cho một danh mục sản phẩm.
 */
export interface Category {
  id: number;
  name: string;
  icon?: string; // SỬA LỖI: Thêm dấu '?' để cho phép thuộc tính này có thể không tồn tại
  image?: string; // Giữ lại image là optional phòng trường hợp khác
  children?: Category[];
}

/**
 * Đại diện cho một đánh giá của sản phẩm từ người dùng.
 */
export interface Review {
  id: number;
  productId: number;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  text: string;
  timestamp: string;
  images?: string[];
}


// ==================================================================
// SECTION: ĐƠN HÀNG & GIAO HÀNG
// ==================================================================

/**
 * Đại diện cho một mặt hàng trong giỏ hàng hoặc đơn hàng.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Kiểu dữ liệu cho toàn bộ giỏ hàng, là một mảng các CartItem.
 */
export type Cart = CartItem[];

/**
 * Tọa độ địa lý.
 */
export interface Location {
  lat: number;
  lng: number;
}

/**
 * Địa chỉ giao hàng của người dùng.
 */
export interface ShippingAddress {
  alias: string;
  address: string;
  name: string;
  phone: string;
}

/**
 * Điểm nhận hàng (cửa hàng, chi nhánh).
 */
export interface Station {
  id: number;
  name: string;
  image: string;
  address: string;
  location: Location;
}

/**
 * Thông tin hình thức giao hàng, có thể là giao tận nơi hoặc tự đến lấy.
 */
export type Delivery =
  | ({
      type: "shipping";
    } & ShippingAddress)
  | {
      type: "pickup";
      name: string;
      address: string;
    };

/**
 * Các trạng thái của một đơn hàng.
 */
export type OrderStatus = "pending" | "shipping" | "completed";

/**
 * Các trạng thái thanh toán của một đơn hàng.
 */
export type PaymentStatus = "pending" | "success" | "failed";

/**
 * Đại diện cho một đơn hàng hoàn chỉnh.
 */
export interface Order {
  id: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  receivedAt: string;
  items: CartItem[];
  delivery: Delivery;
  total: number;
  note: string;
  discountAmount?: number;
}


// ==================================================================
// SECTION: VOUCHER, GIAO DỊCH & HOA HỒNG
// ==================================================================

/**
 * Các loại voucher.
 */
export type VoucherType = "PERCENT" | "FIXED_AMOUNT" | "SHIPPING";

/**
 * Đại diện cho một voucher giảm giá.
 */
export interface Voucher {
  id: number;
  code: string;
  title: string;
  description: string;
  expiryDate: string;
  type: VoucherType;
  value: number;
  condition?: string;
  discountValue?: number; // SỬA LỖI: Bổ sung thuộc tính này
}

/**
 * Các loại giao dịch trong ví hoa hồng.
 */
export type TransactionType = "COMMISSION" | "WITHDRAWAL" | "ADJUSTMENT";

/**
 * Các trạng thái của một giao dịch.
 */
export type TransactionStatus = "PENDING" | "COMPLETED" | "REJECTED";

/**
 * Đại diện cho một giao dịch trong ví hoa hồng.
 */
export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  date: string;
  description: string;
  referralId?: string;
}

/**
 * Đại diện cho một đơn hàng được tạo ra từ link giới thiệu.
 */
export interface ReferralOrder {
  id: string;
  orderId: string;
  totalAmount: number;
  commissionRate: number;
  commissionAmount: number;
  sharedLink: string;
  customerName: string;
  paymentStatus: PaymentStatus;
  commissionStatus: TransactionStatus;
  date: string;
}

// ==================================================================
// SECTION: BANNER & KHÁC
// ==================================================================

/**
 * Đại diện cho một banner quảng cáo.
 */
export interface Banner {
  id: number;
  image: string;
  link?: string;
}


// ==================================================================
// SECTION: UTILITY TYPES
// ==================================================================

/**
 * Kiểu dữ liệu chung cho các phản hồi API có phân trang.
 */
export interface PaginatedResponse<T> {
  data: T[];
  totalItems: number;
  totalPages: number;
}