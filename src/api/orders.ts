import ordersData from '../mock/orders.json';
import { Order, PaginatedResponse } from '@/types'; // Import Order and PaginatedResponse

export const getAllOrders = async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Order>> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call delay
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = ordersData.slice(startIndex, endIndex) as Order[];
  const totalItems = ordersData.length;
  const totalPages = Math.ceil(totalItems / limit);

  return { data: paginatedData, totalItems, totalPages };
};