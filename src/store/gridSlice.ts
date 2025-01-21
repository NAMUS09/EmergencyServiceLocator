import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CellType = "X" | "Y" | "Z" | "U";
type TServiceType = "X" | "Y" | "U";

export type ServiceType = "ambulance" | "hospital";
interface GridState {
  grid: CellType[][];
  selectedService: ServiceType;

  selectedUser: [number, number] | null;
}

// Define the grid size (13 rows x 16 columns)
const gridRows = 13;
const gridCols = 16;

// Create an empty grid with "Z" for each cell
const gridSpaces = Array(gridRows)
  .fill(null)
  .map(() => Array(gridCols).fill("Z"));

// Define hospital location(s)
const hospitalLocations: [number, number][] = [
  [5, 5],
  [12, 6],
];

// Define ambulance location(s)
const ambulanceLocations: [number, number][] = [
  [10, 10],
  [3, 7],
];

// Define user location(s)
const userLocation: [number, number][] = [
  [2, 12],
  [9, 2],
];

// Function to place services in the grid
const initializeGrid = () => {
  // Copy the empty grid to avoid mutating the original
  const grid = gridSpaces.map((row) => [...row]);

  // Place hospitals in the grid
  hospitalLocations.forEach(([row, col]) => {
    grid[row][col] = "Y"; // "Y" represents a hospital
  });

  // Place ambulances in the grid
  ambulanceLocations.forEach(([row, col]) => {
    grid[row][col] = "X"; // "X" represents an ambulance
  });

  // Place the user in the grid
  userLocation.forEach(([row, col]) => {
    grid[row][col] = "U"; // "U" represents the user
  });

  return grid;
};

const initialState: GridState = {
  grid: initializeGrid(),
  selectedService: "ambulance",
  selectedUser: null,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    setCell: (
      state,
      action: PayloadAction<{ row: number; col: number; type: TServiceType }>
    ) => {
      const { row, col, type } = action.payload;
      // Create a copy of the grid and update the specific cell
      const updatedGrid = state.grid.map((r, rowIndex) =>
        r.map((cell, colIndex) =>
          rowIndex === row && colIndex === col ? type : cell
        )
      );

      // Update the state with the new grid
      state.grid = updatedGrid;
    },
    setUser: (state, action: PayloadAction<{ row: number; col: number }>) => {
      const { row, col } = action.payload;

      state.selectedUser = [row, col];
    },
    setService: (state, action: PayloadAction<ServiceType>) => {
      state.selectedService = action.payload;
    },
  },
});

export const { setCell, setService, setUser } = gridSlice.actions;
export default gridSlice.reducer;
