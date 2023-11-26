import React from "react";
import { HistoryListItem } from "./HistoryListItem";
import { CityData } from "../../interfaces/common";

interface HistoryProps {
  historyList: CityData[];
  onCityClick: (index: number, lat: number, lon: number) => void;
  onDeleteClick: (index: number) => void;
  undoIndex: number | null;
  onUndoClick: () => void;
}

export const History: React.FC<HistoryProps> = ({
  historyList,
  onCityClick,
  onDeleteClick,
  undoIndex,
  onUndoClick,
}) => {
  return (
    <>
      {!!historyList.length && (
        <>
          <h3>History search</h3>
          <ul className="suggested-cities-list">
            {historyList.map((listItem, i) => (
              <HistoryListItem
                {...listItem}
                onCityClick={onCityClick}
                onDeleteClick={onDeleteClick}
                onUndoClick={onUndoClick}
                undoIndex={undoIndex}
                itemIndex={i}
                key={`${i}${listItem.lat}${listItem.lon}`}
              />
            ))}
          </ul>
        </>
      )}
    </>
  );
};
