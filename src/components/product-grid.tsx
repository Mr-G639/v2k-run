import { Product } from "@/types";
import ProductItem from "./product-item";
import { HTMLAttributes } from "react";

export interface ProductGridProps extends HTMLAttributes<HTMLDivElement> {
  products: Product[];
  replace?: boolean;
  layout?: "grid" | "horizontal"; // Thêm thuộc tính layout
}

export default function ProductGrid({
  products,
  className,
  replace,
  layout = "grid", // Mặc định là 'grid'
  ...props
}: ProductGridProps) {
  if (layout === "horizontal") {
    return (
      <div
        className={"flex space-x-4 overflow-x-auto px-4 pt-2 pb-8 ".concat(
          className ?? ""
        )}
        {...props}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none"
            style={{ width: "calc(40vw)" }}
          >
            <ProductItem product={product} replace={replace} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={"grid grid-cols-2 px-4 pt-2 pb-8 gap-4 ".concat(
        className ?? ""
      )}
      {...props}
    >
      {products.map((product) => (
        <ProductItem key={product.id} product={product} replace={replace} />
      ))}
    </div>
  );
}