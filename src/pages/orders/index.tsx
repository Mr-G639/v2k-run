
import { FC, PropsWithChildren, ReactNode } from "react";
import { Box, Text } from "zmp-ui";
import { Link } from "react-router-dom";

export interface SectionProps {
  title: string;
  /**
   * Nội dung của Section, thường là danh sách sản phẩm hoặc các thành phần khác.
   */
  children: ReactNode;
  /**
   * Nếu là `true`, sẽ hiển thị một liên kết "Xem thêm" ở góc phải.
   * Mặc định là `false`.
   */
  more?: boolean;
  /**
   * Đường dẫn cho liên kết "Xem thêm".
   * Mặc định là "/".
   */
  path?: string;
}

/**
 * Component Section được dùng để tạo các khối nội dung có tiêu đề trên trang.
 * Ví dụ: "Flash Sale", "Sản phẩm bán chạy".
 * Hỗ trợ tùy chọn hiển thị nút "Xem thêm".
 */
const Section: FC<PropsWithChildren<SectionProps>> = ({
  title,
  children,
  more = false, // Đặt giá trị mặc định
  path = "/",      // Đặt giá trị mặc định
}) => {
  return (
    <Box className="bg-white">
      <div className="flex items-center justify-between p-4 pb-2">
        <Text.Title className="font-bold">{title}</Text.Title>
        {more && (
          <Link to={path} className="text-primary text-sm font-medium">
            Xem thêm
          </Link>
        )}
      </div>
      {children}
    </Box>
  );
};

export default Section;