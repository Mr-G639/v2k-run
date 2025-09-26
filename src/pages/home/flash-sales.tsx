// src/pages/home/flash-sales.tsx

import React from "react";
import { Product } from "../../types";
import Section from "../../components/section";
import ProductItem from "../../components/product-item";
import { ProductItemSkeleton } from "@/components/skeleton";

interface FlashSalesProps {
  products: Product[];
}

const FlashSales: React.FC<FlashSalesProps> = ({ products }) => {
  // Nếu không có sản phẩm, không hiển thị section này
  if (!products) {
    return null;
  }
  
  return (
    <Section title="⚡ Flash Sale">
      {/* Container chính cho phép cuộn nội dung theo chiều ngang (overflow-x-auto) */}
      {/* scrollbar-hide là một tiện ích tùy chỉnh để ẩn thanh cuộn cho giao diện sạch sẽ hơn */}
      <div className="overflow-x-auto scrollbar-hide">
        {/* Dùng inline-flex để các item con xếp thành một hàng duy nhất */}
        <div className="inline-flex space-x-1 p-0 pl-0">
          {products.length === 0
            ? // Hiển thị skeleton loading khi đang chờ dữ liệu
              Array.from(new Array(4)).map((_, i) => (
                <div key={i} className="w-36 flex-shrink-0">
                  <ProductItemSkeleton />
                </div>
              ))
            : // Hiển thị sản phẩm thực tế
              products.map((product) => (
                // Mỗi item có chiều rộng cố định và không bị co lại (flex-shrink-0)
                <div key={product.id} className="w-36 flex-shrink-0">
                  <ProductItem product={product} />
                </div>
              ))}
        </div>
      </div>
    </Section>
  );
};

export default FlashSales;