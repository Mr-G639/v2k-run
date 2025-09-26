import Section from "./section";
import HorizontalDivider from "./horizontal-divider";
import Carousel from "./carousel";
import { Button, Icon, List } from "zmp-ui";
import React, { HTMLAttributes } from "react"; // Import HTMLAttributes

// Basic Skeleton component with customizable class names
export default function Skeleton({ className = "" }) {
  return (
    <div className={`bg-skeleton animate-pulse ${className}`}></div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-full bg-background">
      {/* ... nội dung cũ của PageSkeleton ... */}
    </div>
  );
}

export function ProductItemSkeleton() {
  return (
    <div className="flex flex-col cursor-progress group bg-section rounded-xl p-2 shadow-[0_10px_24px_#0D0D0D17]">
      {/* ... nội dung cũ của ProductItemSkeleton ... */}
    </div>
  );
}

export function SelectSkeleton(props: { width: number }) {
  return (
    <div
      className="h-8 rounded-full bg-skeleton animate-pulse px-3 flex items-center justify-end"
      style={{ width: props.width }}
    >
      <Icon icon="zi-chevron-down" />
    </div>
  );
}

export function StationSkeleton() {
  return (
    <button className="flex items-center space-x-4 p-4 pr-2 bg-section rounded-lg text-left">
      {/* ... nội dung cũ của StationSkeleton ... */}
    </button>
  );
}

export function OrderSummarySkeleton() {
  return (
    <Section
      title={
        <div className="w-full flex justify-between items-center space-x-2 font-normal">
          {/* ... nội dung cũ ... */}
        </div>
      }
      className="flex-1 overflow-y-auto rounded-lg"
    >
     {/* ... nội dung cũ ... */}
    </Section>
  );
}

export function UserInfoSkeleton() {
  return (
    <div className="bg-section rounded-lg p-4 flex items-center space-x-4 border-[0.5px] border-black/15">
      {/* ... nội dung cũ ... */}
    </div>
  );
}

// --- THÊM CÁC COMPONENT MỚI VÀO ĐÂY ---
export function ProductGridSkeleton({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={"grid grid-cols-2 px-4 pt-2 pb-8 gap-4 ".concat(
        className ?? ""
      )}
      {...props}
    >
      <ProductItemSkeleton />
      <ProductItemSkeleton />
      <ProductItemSkeleton />
      <ProductItemSkeleton />
    </div>
  );
}

export function SearchResultSkeleton() {
  return (
    <Section title={`Kết quả`}>
      <ProductGridSkeleton />
    </Section>
  );
}