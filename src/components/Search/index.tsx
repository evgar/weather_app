import React from "react";
import { SuggestedCity } from "../../interfaces/common";

import "./index.css";

interface SearchProps {
  onSuggestedCityClick: (coordinates: { lat: number; lon: number }) => void;
  search: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSuggestedCitiesLoading: boolean;
  suggestedCities: SuggestedCity[];
  onSearch: () => void;
}

export const Search: React.FC<SearchProps> = ({
  onSuggestedCityClick,
  search,
  onInputChange,
  isSuggestedCitiesLoading,
  suggestedCities,
  onSearch,
}) => (
  <>
    <div className="input-container">
      <input
        type="text"
        value={search}
        onChange={onInputChange}
        className="text-input"
      />
      <button
        onClick={onSearch}
        disabled={isSuggestedCitiesLoading}
        className="search-button"
      >
        Search
      </button>
    </div>
    <ul className="cities-list">
      {suggestedCities.map(
        ({ name, country, lat, lon, id }: SuggestedCity, i) => (
          <li
            key={`${i}${lat}${lon}`}
            onClick={() => onSuggestedCityClick({ lat, lon })}
            className="city"
          >{`${name} ${country}`}</li>
        )
      )}
    </ul>
  </>
);
