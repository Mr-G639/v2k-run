import stationsData from '../mock/stations.json';

import { PaginatedResponse } from '@/types';
interface Station {
  // Define your station interface based on the structure of stations.json
  // Example:
  id: number;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
  // Add other properties as needed
}

export const getAllStations = async (page: number = 1, limit: number = 10): Promise<PaginatedResponse<Station>> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const totalItems = stationsData.length;
  const totalPages = Math.ceil(totalItems / limit);

  return {
    data: (stationsData as Station[]).slice(startIndex, endIndex),
    totalItems,
    totalPages,
  };
};

// You can add more API functions here if needed
// export const getStationById = async (id: number): Promise<Station | undefined> => {
//   await new Promise(resolve => setTimeout(resolve, 500));
//   return stationsData.find(station => station.id === id) as Station | undefined;
// };