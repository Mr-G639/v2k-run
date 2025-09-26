// src/app.tsx

// React core
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

// Router
import router from "@/router";

// SỬA LỖI: Bổ sung các import cần thiết từ @tanstack/react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ZaUI stylesheet
import 'zmp-ui/zaui.css'; 

// Tailwind stylesheet
import "@/css/tailwind.scss";
// Your custom stylesheet
import "@/css/app.scss";

// Expose app configuration to the window object
import appConfig from "../app-config.json";

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig;
}

// SỬA LỖI: Tạo một instance của QueryClient để quản lý data-fetching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // Tắt chế độ tự động thử lại khi query thất bại
      refetchOnWindowFocus: false, // Tắt chế độ tự động fetch lại khi focus vào cửa sổ
    },
  },
});

// Mount the React application
const root = createRoot(document.getElementById("app")!);

// SỬA LỖI: Bọc toàn bộ ứng dụng bằng QueryClientProvider
root.render(
  createElement(
    QueryClientProvider,
    { client: queryClient },
    createElement(RouterProvider, { router })
  )
);