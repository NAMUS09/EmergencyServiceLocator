import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setUser } from "../store/gridSlice";
import { RootState } from "../store/store";

const MatrixGrid: React.FC = () => {
  const grid = useSelector((state: RootState) => state.grid.grid);

  const dispatch = useDispatch();

  const handleCellClick = (row: number, col: number, disabled: boolean) => {
    if (disabled) return;
    // Update the grid with the selected service type
    dispatch(setUser({ row, col }));
  };

  return (
    <div className="grid grid-cols-16 gap-2">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex, cell !== "U")}
              className={`w-8 h-8 flex items-center justify-center border ${
                cell === "X"
                  ? "bg-red-500"
                  : cell === "Y"
                  ? "bg-blue-500"
                  : cell === "U"
                  ? "bg-green-500 cursor-pointer"
                  : "bg-gray-200"
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixGrid;
