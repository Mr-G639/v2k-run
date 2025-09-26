import { Location } from '@/types'; // Assuming Location type is defined in '@/types'

// Function to decode location token
export const decodeLocationTokenApi = async (token: string): Promise<Location> => {
  // Normally would call server API to decode token
  // This is a simulated response for demo purposes
  await simulateApiDelay();
  return {
    lat: 10.7769,
    lng: 106.7009
  };
};

// Function to decode phone number token
export const decodePhoneNumberTokenApi = async (token: string): Promise<string> => {
  // Normally would call server API to decode token
  // This is a simulated response for demo purposes
  await simulateApiDelay();
  return "0912345678";
};

const simulateApiDelay = (ms = 400) => new Promise(resolve => setTimeout(resolve, ms));