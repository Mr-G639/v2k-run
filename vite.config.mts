// vite.config.mts

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import zaloMiniApp from "zmp-vite-plugin";
import path from "path";
import { fileURLToPath } from "url";
import { visualizer } from "rollup-plugin-visualizer";

// Cấu hình để lấy __dirname trong môi trường ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * Đường dẫn gốc của ứng dụng.
   * Để trống để đảm bảo các tài nguyên được tham chiếu một cách tương đối,
   * phù hợp với môi trường của Zalo Mini App.
   */
  base: "",

  /**
   * Danh sách các plugin được sử dụng.
   * Thứ tự của plugin có thể quan trọng.
   */
  plugins: [
    // Plugin chính thức cho React
    react(),

    // Plugin cho Zalo Mini App, xử lý các tác vụ đặc thù
    zaloMiniApp(),

    // Plugin để phân tích và trực quan hóa kích thước bundle
    visualizer({
      filename: "dist/stats.html", // Tên file output trong thư mục dist
      open: true, // Tự động mở file báo cáo sau khi build
      gzipSize: true, // Hiển thị kích thước sau khi nén gzip
      brotliSize: true, // Hiển thị kích thước sau khi nén brotli
    }),
  ],

  /**
   * Cấu hình cách Vite phân giải các module.
   */
  resolve: {
    alias: {
      // Tạo một alias '@' trỏ đến thư mục 'src'.
      // Giúp việc import các module từ 'src' trở nên ngắn gọn và nhất quán.
      // Ví dụ: import Component from '@/components/Component'
      "@": path.resolve(__dirname, "./src"),
    },
  },

  /**
   * Định nghĩa các biến toàn cục sẽ được thay thế tại thời điểm build.
   * Hữu ích để thay thế các biến môi trường.
   */
  define: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});