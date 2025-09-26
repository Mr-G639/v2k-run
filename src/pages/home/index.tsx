import { productsState } from "@/state";
import { useAtomValue } from "jotai";
import { FC, Suspense } from "react";
import { Page } from "zmp-ui";
import AllProducts from "./all-products";
import Banners from "./banners";
import FlashSales from "./flash-sales";
import { loadable } from "jotai/utils";
import { PageSkeleton } from "@/components/skeleton";

const loadableProducts = loadable(productsState);

const HomePageContent: FC = () => {
  const productsLoadable = useAtomValue(loadableProducts);

  if (productsLoadable.state === 'loading') {
    return <PageSkeleton />;
  }

  if (productsLoadable.state === 'hasError') {
    return <div>Lỗi tải sản phẩm.</div>;
  }

  const products = productsLoadable.data;

  return (
    <>
      <Suspense fallback={null}>
        <Banners />
      </Suspense>
      <Suspense fallback={null}>
        <FlashSales products={products} />
      </Suspense>
      <Suspense fallback={null}>
        <AllProducts products={products} />
      </Suspense>
    </>
  );
};

const HomePage: FC = () => {
  return (
    <Page>
      <HomePageContent />
    </Page>
  );
};

export default HomePage;