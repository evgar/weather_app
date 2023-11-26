import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { HistoryListItem } from "../components/History/HistoryListItem";

test("renders HistoryListItem component", () => {
  const props = {
    name: "City",
    country: "Country",
    lat: 40.7128,
    lon: -74.006,
    onCityClick: jest.fn(),
    onDeleteClick: jest.fn(),
    onUndoClick: jest.fn(),
    undoIndex: null,
    itemIndex: 0,
  };

  const { getByText } = render(<HistoryListItem {...props} />);
  const cityName = getByText("City, Country");
  expect(cityName).toBeInTheDocument();
});

test("calls onCityClick when city name is clicked", () => {
  const onCityClick = jest.fn();
  const props = {
    name: "City",
    country: "Country",
    lat: 40.7128,
    lon: -74.006,
    onCityClick,
    onDeleteClick: jest.fn(),
    onUndoClick: jest.fn(),
    undoIndex: null,
    itemIndex: 0,
  };

  const { getByText } = render(<HistoryListItem {...props} />);
  const cityName = getByText("City, Country");
  fireEvent.click(cityName);
  expect(onCityClick).toHaveBeenCalledWith(0, 40.7128, -74.006);
});
