// src/api/banners.ts

import bannersData from '../mock/banners.json';

// Xóa interface Banner không cần thiết
export const getAllBanners = async (): Promise<string[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // bannersData là một mảng các chuỗi, khớp với kiểu trả về
  return bannersData as string[];
};