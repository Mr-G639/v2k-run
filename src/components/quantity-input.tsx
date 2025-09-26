import React, { useEffect, useState } from "react";
import { Button } from "zmp-ui";
import { MinusIcon, PlusIcon } from "./vectors";

export interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  value,
  onChange,
  minValue = 0, // Đặt giá trị mặc định cho minValue
}) => {
  const [localValue, setLocalValue] = useState(String(value));

  // Đồng bộ state nội bộ khi prop `value` từ bên ngoài thay đổi
  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  // Xử lý khi người dùng thay đổi giá trị trong input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Chỉ cho phép nhập số
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    setLocalValue(numericValue);
  };

  // Xử lý khi người dùng rời khỏi input (onBlur)
  const handleBlur = () => {
    const finalValue = Math.max(minValue, Number(localValue) || minValue);
    if (finalValue !== value) {
      onChange(finalValue);
    }
    setLocalValue(String(finalValue)); // Đảm bảo giá trị hiển thị luôn đúng
  };

  // Xử lý khi nhấn nút giảm số lượng
  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    onChange(Math.max(minValue, value - 1));
  };

  // Xử lý khi nhấn nút tăng số lượng
  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    onChange(value + 1);
  };

  return (
    <div className="w-full flex items-center">
      <Button
        size="small"
        variant="tertiary"
        className="min-w-0 aspect-square"
        onClick={handleDecrement}
      >
        <MinusIcon width={14} height={14} />
      </Button>
      <input
        style={{ width: `calc(${localValue.length}ch + 16px)` }}
        className="flex-1 text-center font-medium text-xs px-2 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        inputMode="numeric"
        value={localValue}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onClick={(e) => e.stopPropagation()}
      />
      <Button
        size="small"
        variant="tertiary"
        className="min-w-0 aspect-square"
        onClick={handleIncrement}
      >
        <PlusIcon width={14} height={14} />
      </Button>
    </div>
  );
};

// Tối ưu hóa hiệu năng bằng React.memo
export default React.memo(QuantityInput);