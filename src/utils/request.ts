import { getConfig } from "./template";

const API_URL = getConfig((config) => config.template.apiUrl);

const mockUrls = import.meta.glob<{ default: string }>("../mock/*.json", {
  query: "url",
  eager: true,
});

export async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const url = API_URL
    ? `${API_URL}${path}`
    : mockUrls[`../mock${path}.json`]?.default;

  if (!API_URL) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  const response = await fetch(url, options);
  return response.json() as T;
}

export async function requestWithFallback<T>(
  path: string,
  fallbackValue: T
): Promise<T> {
  try {
    const result = await request<T>(path);
    if (result === null || typeof result === 'undefined') {
      return fallbackValue;
    }
    return result;
  } catch (error) {
    console.warn(
      `An error occurred while fetching data. Falling back to default value!`,
      { path, error, fallbackValue }
    );
    return fallbackValue;
  }
}

export async function requestWithPost<P, T>(
  path: string,
  payload: P
): Promise<T> {
  return await request<T>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}