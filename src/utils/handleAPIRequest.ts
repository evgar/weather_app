import { CityDataResponse, SuggestedCity } from "../interfaces/common";

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error! status: ${err.message}`);
    }
  }
};

export default async function handleApiRequest(
  url: string,
  onSuccess: (data: SuggestedCity[] | CityDataResponse, index?: number) => void,
  index?: number
) {
  try {
    const result = await fetchData(url);
    onSuccess(result, index);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}
