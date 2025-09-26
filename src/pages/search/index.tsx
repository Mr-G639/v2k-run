import Section from "@/components/section";
import { SearchResultSkeleton } from "@/components/skeleton";
import { useAtomValue } from "jotai";
import { Suspense } from "react";
import {
  keywordState,
  recommendedProductsState,
  searchResultState,
  searchCategoriesResultState,
} from "@/state";
import ProductGrid from "@/components/product-grid";
import { EmptySearchResult } from "@/components/empty";
import TransitionLink from "@/components/transition-link";

function SearchedCategories() {
  const categories = useAtomValue(searchCategoriesResultState);

  if (categories.length === 0) {
    return null;
  }

  return (
    <Section title="Danh mục liên quan">
      <div className="px-4 pt-2 pb-4">
        {categories.map((category) => (
          <TransitionLink
            to={`/category/${category.id}`}
            key={category.id}
            className="flex items-center space-x-3 py-2 border-b border-gray-200 last:border-b-0"
          >
            <img
              src={category.image}
              className="w-10 h-10 rounded-full bg-skeleton"
              alt={category.name}
            />
            <span className="font-medium">{category.name}</span>
          </TransitionLink>
        ))}
      </div>
    </Section>
  );
}

function SearchedProducts() {
  const searchResult = useAtomValue(searchResultState);

  if (searchResult.length === 0) {
    return <EmptySearchResult />;
  }

  return (
    <Section title={`Sản phẩm (${searchResult.length})`}>
      <ProductGrid products={searchResult} />
    </Section>
  );
}

export function SearchResult() {
  const searchResult = useAtomValue(searchResultState);
  const categoriesResult = useAtomValue(searchCategoriesResultState);

  if (searchResult.length === 0 && categoriesResult.length === 0) {
    return <EmptySearchResult />;
  }

  return (
    <div className="w-full h-full space-y-2 bg-background">
      <div className="h-full flex flex-col overflow-y-auto pb-16 space-y-2">
        <SearchedCategories />
        <SearchedProducts />
      </div>
    </div>
  );
}

export function RecommendedProducts() {
  const recommendedProducts = useAtomValue(recommendedProductsState);

  return (
    <Section title="Gợi ý sản phẩm">
      <ProductGrid products={recommendedProducts} layout="horizontal" />
    </Section>
  );
}

export default function SearchPage() {
  const keyword = useAtomValue(keywordState);

  if (keyword) {
    return (
      <Suspense fallback={<SearchResultSkeleton />}>
        <SearchResult />
      </Suspense>
    );
  }
  return <RecommendedProducts />;
}