import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Search } from "../components/Search";

test("renders Search component", () => {
  const props = {
    onSuggestedCityClick: jest.fn(),
    search: "",
    onInputChange: jest.fn(),
    isSuggestedCitiesLoading: false,
    suggestedCities: [],
    onSearch: jest.fn(),
  };

  const { getByText } = render(<Search {...props} />);
  const searchButton = getByText("Search");
  expect(searchButton).toBeInTheDocument();
});

test("calls onSearch when search button is clicked", () => {
  const onSearch = jest.fn();
  const props = {
    onSuggestedCityClick: jest.fn(),
    search: "123",
    onInputChange: jest.fn(),
    isSuggestedCitiesLoading: false,
    suggestedCities: [],
    onSearch,
  };

  const { getByText } = render(<Search {...props} />);
  const searchButton = getByText("Search");
  fireEvent.click(searchButton);
  expect(onSearch).toHaveBeenCalled();
});
