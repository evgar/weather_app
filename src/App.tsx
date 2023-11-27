import React, { useEffect, useState } from "react";

import { History } from "./components/History";
import { Search } from "./components/Search";
import { Widget } from "./components/Widget";

import { UNDO_DELETE_TIMEOUT } from "./consts/timeouts";
import {
  OPEN_WEATHER_MAP_API_URL,
  OPEN_WEATHER_SUGGESTED_CITIES_API_URL,
} from "./consts/apiUrls";
import {
  OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_API_SUGGESTIONS_LIMIT,
} from "./enums/apiKeys";

import { CityData, CityDataResponse, SuggestedCity } from "./interfaces/common";

import "./App.css";
import handleApiRequest from "./utils/handleAPIRequest";

const App: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [history, setHistory] = useState<CityData[]>([]);
  const [suggestedCities, setSuggestedCities] = useState<SuggestedCity[]>([]);
  const [isSuggestedCitiesLoading, setIsSuggestedCitiesLoading] =
    useState<boolean>(false);
  const [deletionIndexInPending, setDeletionIndexInPending] = useState<
    number | null
  >(null);
  const viewableHistory = history.slice(0, -1);

  useEffect(() => {
    const undoTimerId = setTimeout(() => {
      const updatedHistoryList = history.filter(
        (_: CityData, i: number) => deletionIndexInPending !== i
      );

      setHistory(updatedHistoryList);
      setDeletionIndexInPending(null);
    }, UNDO_DELETE_TIMEOUT);

    if (deletionIndexInPending === null) clearTimeout(undoTimerId);

    return () => clearTimeout(undoTimerId);
  }, [deletionIndexInPending]);

  const handleCityData = (
    data: SuggestedCity[] | CityDataResponse,
    index?: number
  ) => {
    if (!Array.isArray(data)) {
      const {
        name,
        id,
        sys: { country },
        main: { temp, temp_max, temp_min },
        wind: { speed },
        weather,
      } = data;

      const updatedHistoryList =
        index === undefined ? history : history.filter((_, i) => i !== index);

      setHistory([
        ...updatedHistoryList,
        {
          name,
          id,
          country,
          temp,
          temp_max,
          temp_min,
          speed,
          description: weather[0].description,
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
      ]);
    }
  };

  const handleSetSuggestedCity = (data: SuggestedCity[] | CityDataResponse) => {
    if (Array.isArray(data)) {
      setSuggestedCities(data);
    }
  };

  const getCityData = async ({ lat, lon }: { lat: number; lon: number }) => {
    setSearch("");
    setSuggestedCities([]);

    const url = `${OPEN_WEATHER_MAP_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;

    await handleApiRequest(url, handleCityData);
  };

  const handleHistoryListClick = async (
    index: number,
    lat: number,
    lon: number
  ) => {
    const url = `${OPEN_WEATHER_MAP_API_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${OPEN_WEATHER_API_KEY}`;

    await handleApiRequest(url, handleCityData, index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setSearch(value);
  };

  const handleHistoryDelete = (index: number) => {
    setDeletionIndexInPending(index);
  };

  const handleUndoDelete = () => {
    setDeletionIndexInPending(null);
  };

  const handleSearch = async () => {
    if (!search) return;

    setIsSuggestedCitiesLoading(true);

    const url = `${OPEN_WEATHER_SUGGESTED_CITIES_API_URL}?q=${search}&limit=${OPEN_WEATHER_API_SUGGESTIONS_LIMIT}&appid=${OPEN_WEATHER_API_KEY}`;

    await handleApiRequest(url, handleSetSuggestedCity);

    setIsSuggestedCitiesLoading(false);
  };

  return (
    <>
      <Search
        onSuggestedCityClick={getCityData}
        search={search}
        onInputChange={handleInputChange}
        isSuggestedCitiesLoading={isSuggestedCitiesLoading}
        suggestedCities={suggestedCities}
        onSearch={handleSearch}
      />
      {history[0] && <Widget city={history[history.length - 1]} />}
      <History
        historyList={viewableHistory}
        onCityClick={handleHistoryListClick}
        onDeleteClick={handleHistoryDelete}
        undoIndex={deletionIndexInPending}
        onUndoClick={handleUndoDelete}
      />
    </>
  );
};

export default App;
