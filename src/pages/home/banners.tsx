import Carousel from "@/components/carousel";
import { bannersState } from "@/state";
import { useAtomValue } from "jotai";
import { loadable } from "jotai/utils";

const loadableBannersState = loadable(bannersState);

export default function Banners() {
  const bannersLoadable = useAtomValue(loadableBannersState);

  if (bannersLoadable.state === "loading") {
    // Hiển thị khung xương (skeleton) trong khi chờ tải dữ liệu
    return <div className="h-30 w-full rounded bg-gray-200"></div>;
  }

  if (bannersLoadable.state === "hasError") {
    // Xử lý và thông báo lỗi nếu không tải được banner
    console.error("Error loading banners:", bannersLoadable.error);
    return <div>Error loading banners.</div>;
  }

  // Hiển thị Carousel với dữ liệu banner đã tải thành công
  return (
    <Carousel
      slides={bannersLoadable.data.map((banner) => (
        <img key={banner} className="w-full rounded" src={banner} />
      ))}
    />
  );
}