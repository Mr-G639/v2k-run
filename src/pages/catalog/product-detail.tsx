// src/pages/catalog/product-detail.tsx

import React, { ReactNode, Suspense, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAtom, useAtomValue } from "jotai";
import toast from "react-hot-toast";
import { Button } from "zmp-ui";

import { favoriteProductsState, productState } from "@/state";
import { useCartActions } from "@/hooks/useCart";
import { formatPrice } from "@/utils/format";
import { Product } from "@/types"; // Bổ sung import Product type

import Section from "@/components/section";
import Carousel from "@/components/carousel";
import { HeartIcon } from "@/components/vectors";
import HorizontalDivider from "@/components/horizontal-divider";
import { ProductGridSkeleton } from "@/components/skeleton";

import RelatedProducts from "./related-products";
import ProductReviewsSummary from "./product-reviews/summary";

/**
 * TỐI ƯU HIỆU NĂNG: Tách ShareButton ra ngoài component cha
 * để tránh việc bị khởi tạo lại mỗi khi ProductDetailContent re-render.
 */
const ShareButton: React.FC<{ product: Product }> = ({ product }) => {
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/product/${product.id}`;
    const shareData = {
      title: product.name,
      text: `Kiểm tra sản phẩm này: ${product.name}`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        // Người dùng hủy chia sẻ, không cần xử lý
      }
      return;
    }

    // Fallback: sao chép link vào clipboard cho các trình duyệt không hỗ trợ
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Đã sao chép liên kết sản phẩm");
    } catch {
      toast.error("Không thể chia sẻ");
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="w-full h-9 rounded bg-gray-100 text-gray-700"
    >
      Chia sẻ
    </button>
  );
};

/**
 * Component chứa logic và giao diện chính của trang chi tiết sản phẩm.
 */
function ProductDetailContent() {
  const { id } = useParams<{ id: string }>();
  const product = useAtomValue(productState(Number(id)));
  const [favorites, setFavorites] = useAtom(favoriteProductsState);
  const { addToCart } = useCartActions();
  const navigate = useNavigate();

  const [isMuted] = useState(true);
  const [, setActiveSlideIndex] = useState(0);

  // Hiển thị skeleton nếu sản phẩm đang được tải
  if (!product) {
    return <ProductGridSkeleton />;
  }

  const isFavorited = favorites.includes(product.id);

  const toggleFavorite = () => {
    const message = isFavorited
      ? "Đã xóa khỏi danh sách yêu thích"
      : "Đã thêm vào danh sách yêu thích";
    
    toast.success(message, { id: 'favorite-toast' });

    setFavorites((prev) =>
      isFavorited
        ? prev.filter((favId) => favId !== product.id)
        : [...prev, product.id]
    );
  };
  
  const mediaSlides: ReactNode[] = useMemo(() => {
    const slides: ReactNode[] = [];
    if (product.video) {
      slides.push(
        <video
          key="product-video"
          src={product.video}
          playsInline autoPlay muted={isMuted} loop
          className="w-full aspect-square object-cover rounded-lg"
        />
      );
    }
    product.images.forEach((imgSrc, i) => {
      slides.push(
        <img
          key={`product-image-${i}`}
          src={imgSrc}
          alt={product.name}
          className="w-full aspect-square object-cover rounded-lg"
        />
      );
    });
    return slides;
  }, [product, isMuted]);

  const discountPercent = useMemo(() => {
    if (product.originalPrice && product.price) {
      return 100 - Math.round((product.price * 100) / product.originalPrice);
    }
    return null;
  }, [product.price, product.originalPrice]);

  const handleBuyNow = () => {
    addToCart(product, 1);
    // SỬA LỖI: Xóa bỏ tùy chọn { viewTransition: true } không hợp lệ
    navigate("/cart");
  };

  const handleAddToCart = () => {
    addToCart(product, 1, { toast: true });
  };

  return (
    <div className="w-full h-full flex flex-col bg-section">
      <div className="flex-1 overflow-y-auto">
        <div className="relative">
          <Carousel slides={mediaSlides} onSlideChange={setActiveSlideIndex} />
        </div>

        <div className="p-4 space-y-4">
          <div className="bg-red-50 rounded-lg p-3 text-foreground">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-red-600 text-2xl font-bold">{formatPrice(product.price)}</span>
                {discountPercent !== null && (
                  <span className="text-xs bg-red-100 text-red-600 font-medium px-2 py-0.5 rounded">
                    GIẢM {discountPercent}%
                  </span>
                )}
              </div>
              {product.soldCount && (
                <span className="text-sm text-gray-600">Đã bán {product.soldCount}+</span>
              )}
            </div>
            {product.originalPrice && (
              <div className="mt-1">
                <span className="text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
              </div>
            )}
          </div>

          <div>
            <h1 className="text-lg font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button className="flex-none !bg-red-100 !text-red-500 h-9 aspect-square" onClick={toggleFavorite}>
              <HeartIcon active={isFavorited} className="w-6 h-6" />
            </Button>
            <div className="flex-1">
              <ShareButton product={product} />
            </div>
          </div>
        </div>
        
        <div className="bg-background h-2 w-full"></div>
        <Suspense fallback={<div className="p-4">Đang tải đánh giá...</div>}>
          <ProductReviewsSummary productId={product.id} />
        </Suspense>
        
        {product.detail && (
          <>
            <div className="bg-background h-2 w-full"></div>
            <Section title="Mô tả sản phẩm">
              <div className="text-sm whitespace-pre-wrap text-subtitle p-4 pt-2">
                {product.detail}
              </div>
            </Section>
          </>
        )}
        
        <div className="bg-background h-2 w-full"></div>
        <Section title="Sản phẩm khác">
          <RelatedProducts currentProductId={product.id} />
        </Section>
      </div>

      <HorizontalDivider />
      <div className="flex-none grid grid-cols-2 gap-2 py-3 px-4 bg-section">
        <Button variant="tertiary" onClick={handleAddToCart}>
          Thêm vào giỏ
        </Button>
        <Button onClick={handleBuyNow}>
          Mua ngay
        </Button>
      </div>
    </div>
  );
}

/**
 * Component cha, chịu trách nhiệm xử lý trạng thái loading chung cho toàn trang.
 */
const ProductDetailPage = () => {
  return (
    <Suspense fallback={<ProductGridSkeleton />}>
      <ProductDetailContent />
    </Suspense>
  );
};

export default ProductDetailPage;