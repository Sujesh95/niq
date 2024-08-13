import { FetchError } from "./types";

export const fetchData = async (
  url: string,
  config?: Record<string, unknown>
) => {
  try {
    const response = fetch(url, config);
    return (await response).json();
  } catch (err: unknown) {
    throw new Error((err as FetchError).message);
  }
};
