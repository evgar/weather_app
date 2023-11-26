import React from "react";
import { render } from "@testing-library/react";
import { History } from "../components/History";

test("renders History component with empty historyList", () => {
  const props = {
    historyList: [],
    onCityClick: jest.fn(),
    onDeleteClick: jest.fn(),
    undoIndex: null,
    onUndoClick: jest.fn(),
  };

  const { queryByText } = render(<History {...props} />);
  const historyHeader = queryByText(/History search/i);
  expect(historyHeader).toBeNull();
});

test("renders History component with historyList items", () => {
  const props = {
    historyList: [
      { name: "City1", country: "Country1", lat: 40.7128, lon: -74.006 },
      { name: "City2", country: "Country2", lat: 34.0522, lon: -118.2437 },
    ],
    onCityClick: jest.fn(),
    onDeleteClick: jest.fn(),
    undoIndex: null,
    onUndoClick: jest.fn(),
  };

  const { getByText } = render(<History {...props} />);
  const historyHeader = getByText(/History search/i);
  expect(historyHeader).toBeInTheDocument();

  const city1 = getByText(/City1, Country1/i);
  expect(city1).toBeInTheDocument();

  const city2 = getByText(/City2, Country2/i);
  expect(city2).toBeInTheDocument();
});
