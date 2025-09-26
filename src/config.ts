// src/config.ts

/**
 * Đối tượng CONFIG chứa các hằng số và cấu hình tĩnh cho toàn bộ ứng dụng.
 * Việc tập trung các giá trị này vào một nơi giúp dễ dàng quản lý,
 * tránh lặp lại code và giảm thiểu lỗi do gõ sai (magic strings).
 */
const CONFIG = {
  /**
   * Định nghĩa các key (khóa) được sử dụng để lưu trữ dữ liệu trong Local Storage.
   * Sử dụng các hằng số này thay vì viết chuỗi trực tiếp sẽ giúp:
   * 1. IDE tự động gợi ý, tránh gõ sai.
   * 2. Dễ dàng thay đổi key đồng loạt ở một nơi duy nhất.
   */
  STORAGE_KEYS: {
    USER_INFO: "userInfo", // Key để lưu thông tin người dùng
    DELIVERY: "delivery", // Key để lưu phương thức vận chuyển đã chọn
    SHIPPING_ADDRESS: "shippingAddress", // Key để lưu địa chỉ giao hàng
  },
};

export default CONFIG;