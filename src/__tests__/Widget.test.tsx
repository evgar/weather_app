import React from "react";
import { render } from "@testing-library/react";
import { Widget } from "../components/Widget";

test("renders Widget component", () => {
  const props = {
    city: {
      name: "City",
      temp: 25,
      temp_max: 30,
      temp_min: 20,
      description: "Clear sky",
      speed: 5,
    },
  };

  const { getByText } = render(<Widget {...props} />);
  const cityName = getByText(/City/i);
  expect(cityName).toBeInTheDocument();
});
