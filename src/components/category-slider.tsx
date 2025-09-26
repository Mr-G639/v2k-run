// src/components/category-slider.tsx

import { categoriesState } from "@/state";
import { useAtomValue } from "jotai";
import { useParams } from "react-router-dom";
import { loadable } from "jotai/utils";
import TransitionLink from "./transition-link";

const loadableCategoriesState = loadable(categoriesState);

export interface CategorySliderProps {
  replace?: boolean;
}

export default function CategorySlider({ replace = false }: CategorySliderProps) {
  const { id } = useParams();
  const categoriesLoadable = useAtomValue(loadableCategoriesState);

  if (categoriesLoadable.state === 'loading') {
    return (
      <div className="px-3 py-2 overflow-x-auto flex space-x-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="h-8 w-24 flex-none rounded-full bg-gray-300 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (categoriesLoadable.state === 'hasError') {
    return <div className="px-3 py-2">Error loading categories.</div>;
  }

  const categories = categoriesLoadable.data;

 return (
    <div className="px-3 py-2 overflow-x-auto flex space-x-2">
      {categories.map((category) => (
        <TransitionLink
          to={`/category/${category.id}`}
          key={category.id}
          replace={replace}
          className={"h-8 flex-none rounded-full px-4 flex items-center justify-center border border-black/15 ".concat(
            String(category.id) === id
              ? "bg-primary text-primaryForeground"
              : "bg-section"
          )}
        >
          <p className="text-sm font-medium whitespace-nowrap">{category.name}</p>
        </TransitionLink>
      ))}
    </div>
  );
}