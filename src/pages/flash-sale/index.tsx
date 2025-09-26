import ProductGrid from "@/components/product-grid";
import { ProductGridSkeleton } from "@/components/skeleton";
import { flashSaleProductsState } from "@/state";
import { useAtomValue } from "jotai";
import { Suspense } from "react";
import { Page } from "zmp-ui";

const FlashSaleProducts = () => {
  const products = useAtomValue(flashSaleProductsState);
  return <ProductGrid products={products} />;
}

export default function FlashSalePage() {
  return (
    <Page className="flex flex-col">
        <div className="flex-1 overflow-y-auto">
            <Suspense fallback={<ProductGridSkeleton />}>
                <FlashSaleProducts />
            </Suspense>
        </div>
    </Page>
  );
}