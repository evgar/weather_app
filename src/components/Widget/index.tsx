import React from "react";
import { CityData } from "../../interfaces/common";

interface WidgetProps {
  city: CityData;
}

export const Widget: React.FC<WidgetProps> = ({
  city: { name, temp, temp_max, temp_min, description, speed },
}: WidgetProps) => {
  return (
    <div className="weather-widget">
      <h2>
        <span>{name}</span>
      </h2>
      <p className="weather-info">{`${temp}°C, ${description}, ${speed} m/s`}</p>
      <p className="weather-info">
        <span>Max t°: </span>
        {temp_max} <span>Min t°: </span>
        {temp_min}
      </p>
    </div>
  );
};
