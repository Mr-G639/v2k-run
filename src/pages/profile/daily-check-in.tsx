// src/pages/profile/daily-check-in.tsx

import { dailyCheckInState, loadableUserInfoState, userPointsState } from "@/state";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import toast from "react-hot-toast";
import { Button } from "zmp-ui";

// Hằng số cho điểm thưởng, giúp dễ dàng thay đổi sau này.
const REWARD_POINTS = 10;

/**
 * Custom Hook để quản lý logic của việc điểm danh hàng ngày.
 * Tách biệt logic ra khỏi component giúp component chính sạch sẽ và dễ đọc hơn.
 * @returns {object} Trả về chuỗi ngày điểm danh, trạng thái có thể điểm danh, và hàm để thực hiện điểm danh.
 */
const useDailyCheckIn = () => {
  const [checkInData, setCheckInData] = useAtom(dailyCheckInState);
  const setPoints = useSetAtom(userPointsState); // Chỉ lấy hàm set để cập nhật điểm, không gây re-render.

  // Lấy ngày hôm nay dưới định dạng YYYY-MM-DD để so sánh.
  const today = new Date().toISOString().split("T")[0];

  // Người dùng có thể điểm danh nếu ngày điểm danh cuối cùng khác ngày hôm nay.
  const canCheckIn = checkInData.lastCheckInDate !== today;

  /**
   * Xử lý hành động điểm danh của người dùng.
   */
  const handleCheckIn = () => {
    // Kiểm tra lại để chắc chắn người dùng không thể điểm danh nhiều lần.
    if (!canCheckIn) {
      toast.error("Hôm nay bạn đã điểm danh rồi!");
      return;
    }

    // Tính toán ngày hôm qua để kiểm tra chuỗi điểm danh liên tiếp.
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    const isConsecutive = checkInData.lastCheckInDate === yesterdayString;
    // Nếu điểm danh liên tiếp thì tăng chuỗi, nếu không thì reset về 1.
    const newStreak = isConsecutive ? checkInData.streak + 1 : 1;

    // Cập nhật trạng thái điểm danh vào storage.
    setCheckInData({
      lastCheckInDate: today,
      streak: newStreak,
    });

    // Cộng điểm thưởng cho người dùng.
    setPoints((currentPoints) => currentPoints + REWARD_POINTS);

    // Thông báo thành công cho người dùng.
    toast.success(
      `Điểm danh thành công! +${REWARD_POINTS} điểm. Chuỗi ${newStreak} ngày.`
    );
  };

  return {
    streak: checkInData.streak,
    canCheckIn,
    checkIn: handleCheckIn,
  };
};

/**
 * Component hiển thị giao diện cho chức năng điểm danh hàng ngày.
 */
export default function DailyCheckIn() {
  const userInfo = useAtomValue(loadableUserInfoState);
  const { streak, canCheckIn, checkIn } = useDailyCheckIn();

  // Chỉ hiển thị component này khi người dùng đã đăng nhập (có thông tin).
  if (userInfo.state !== 'hasData' || !userInfo.data) {
    return null;
  }

  return (
    <div className="bg-section rounded-lg p-4 space-y-3 border-[0.5px] border-black/15">
      <div className="text-sm font-medium">Điểm danh hàng ngày</div>
      <div className="text-center text-gray-500 text-xs">
        Bạn đã điểm danh liên tục{" "}
        <span className="font-bold text-primary text-sm">{streak}</span> ngày!
      </div>
      <Button
        fullWidth
        disabled={!canCheckIn}
        onClick={checkIn}
        variant={canCheckIn ? "primary" : "secondary"}
      >
        {canCheckIn
          ? `Điểm danh nhận ${REWARD_POINTS} điểm!`
          : "Hẹn gặp lại bạn vào ngày mai"}
      </Button>
    </div>
  );
}