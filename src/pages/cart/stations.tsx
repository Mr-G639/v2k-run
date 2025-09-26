import { StationSkeleton } from "@/components/skeleton";
import { selectedStationIndexState, stationsState } from "@/state";
import type { Station } from "@/types";
import { useAtomValue, useSetAtom } from "jotai"; // Sửa lại import
import { Suspense } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Station({
  station,
  onSelect,
}: {
  station: Station & { distance?: string };
  onSelect: () => void;
}) {
  return (
    <button
      className="flex items-center space-x-4 p-4 pr-2 bg-section rounded-lg text-left"
      onClick={onSelect}
    >
      <img src={station.image} className="h-14 w-14 rounded-lg bg-skeleton" />
      <div className="flex-1 space-y-0.5">
        <div className="text-sm">{station.name}</div>
        <div className="text-xs text-inactive">{station.address}</div>
        {station.distance && (
          <div className="text-xs text-primary">{station.distance}</div>
        )}
      </div>
    </button>
  );
}

function Stations() {
  // Dùng useAtomValue để đọc dữ liệu từ atom chỉ đọc
  const stations = useAtomValue(stationsState);
  // Dùng useSetAtom để lấy hàm cập nhật cho atom có thể ghi
  const setSelectedStation = useSetAtom(selectedStationIndexState);
  const navigate = useNavigate();

  return stations.map((station, i) => (
    <Station
      key={station.id}
      station={station}
      onSelect={() => {
        setSelectedStation(i);
        toast.success("Đã thay đổi điểm nhận hàng");
        navigate(-1);
      }}
    />
  ));
}

function StationsPage() {
  return (
    <div className="p-4 space-y-2 flex flex-col">
      <Suspense
        fallback={
          <>
            <StationSkeleton />
            <StationSkeleton />
            <StationSkeleton />
            <StationSkeleton />
          </>
        }
      >
        <Stations />
      </Suspense>
    </div>
  );
}

export default StationsPage;