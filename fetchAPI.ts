// import { envVariables } from "./env";

const baseUrl: string = (import.meta as any).env.VITE_BASE_URL;
// const baseUrl: string = envVariables.BASE_URL;

const fetchApi = async <T>(endPoint: string): Promise<T> => {
  try {
    const response: Response = await fetch(`${baseUrl}${endPoint}`);
    const finalResponse: T = await response.json();
    return finalResponse;
  } catch (error) {
    console.log("Failed to fetch", error);
    throw error;
  }
};

export default fetchApi;
