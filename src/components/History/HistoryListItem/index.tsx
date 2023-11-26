import React from "react";

interface HistoryListItemProps {
  name: string;
  country: string;
  lat: number;
  lon: number;
  onCityClick: (index: number, lat: number, lon: number) => void;
  onDeleteClick: (index: number) => void;
  onUndoClick: () => void;
  undoIndex: number | null;
  itemIndex: number;
}

export const HistoryListItem: React.FC<HistoryListItemProps> = ({
  name,
  country,
  lat,
  lon,
  onCityClick,
  onDeleteClick,
  onUndoClick,
  undoIndex,
  itemIndex,
}) => (
  <li className="suggested-cities-list-item">
    <p onClick={() => onCityClick(itemIndex, lat, lon)}>
      {name}, {country}
    </p>
    <div className="btn-group">
      <div onClick={() => onDeleteClick(itemIndex)} className="delete-btn">
        Delete
      </div>
      {undoIndex === itemIndex && (
        <div onClick={onUndoClick} className="undo-btn">
          Undo
        </div>
      )}
    </div>
  </li>
);
