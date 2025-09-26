// src/components/layout.tsx

import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import { Suspense, useEffect } from "react";
import { PageSkeleton } from "./skeleton";
import { Toaster } from "react-hot-toast";
import { ScrollRestoration } from "./scroll-restoration";
import FloatingCartPreview from "./floating-cart-preview";
import { useDrag } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";
import { useSetAtom } from "jotai";
import { mainScrollState, searchOverlayVisibleState } from "@/state";
import { SearchOverlay } from "./search-overlay";

// Hằng số cấu hình cho cử chỉ vuốt
const SWIPE_THRESHOLD_PERCENT = 0.3;
const EDGE_THRESHOLD_PX = 40;
const DRAG_ACTIVATION_THRESHOLD_PX = 10;

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const canGoBack = location.key !== "default";

  const setScrollY = useSetAtom(mainScrollState);
  
  // SỬA LỖI: Lấy hàm `set` state và `searchParams` từ URL
  const setSearchOverlayVisible = useSetAtom(searchOverlayVisibleState);
  const [searchParams] = useSearchParams();

  // SỬA LỖI: Thêm useEffect để đồng bộ trạng thái của Lớp phủ tìm kiếm với URL
  useEffect(() => {
    if (searchParams.get("search") === "true") {
      setSearchOverlayVisible(true);
    } else {
      setSearchOverlayVisible(false);
    }
  }, [searchParams, setSearchOverlayVisible]);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { tension: 250, friction: 30 },
  }));

  useEffect(() => {
    api.start({ x: 0, immediate: true });
  }, [location.key, api]);

  const bind = useDrag(
    ({ down, movement: [mx], initial: [ix], velocity: [vx], last }) => {
      if (!canGoBack || (down && ix > EDGE_THRESHOLD_PX)) return;

      if (last) {
        if (mx > window.innerWidth * SWIPE_THRESHOLD_PERCENT || vx > 0.5) {
          navigate(-1);
        } else {
          api.start({ x: 0 });
        }
      } else {
        api.start({ x: Math.max(mx, 0), immediate: true });
      }
    },
    {
      axis: "x",
      threshold: DRAG_ACTIVATION_THRESHOLD_PX,
    },
  );

  return (
    <div className="w-screen h-screen flex flex-col bg-section text-foreground overflow-x-hidden">
      <animated.div
        {...bind()}
        style={{ x, touchAction: 'pan-y' }}
        className="flex-1 flex flex-col bg-background h-full w-full"
      >
        <Header />
        <div 
          className="flex-1 overflow-y-auto"
          onScroll={(e) => setScrollY(e.currentTarget.scrollTop)}
        >
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </animated.div>
      
      {/* CÁC THÀNH PHẦN TOÀN CỤC */}
      <Toaster
        position="top-center"
        containerStyle={{
          top: "var(--zaui-safe-area-top, 0px)",
          marginTop: '12px',
        }}
        toastOptions={{
          className: 'text-sm font-medium',
          duration: 3000,
        }}
      />

      <FloatingCartPreview />
      <ScrollRestoration />

      {/* SỬA LỖI: Luôn render SearchOverlay và để nó tự quyết định việc hiển thị */}
      <SearchOverlay />
    </div>
  );
}