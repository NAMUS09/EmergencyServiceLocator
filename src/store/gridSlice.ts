import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CellName = "X" | "Y" | "Z" | "U";
export type CellType = {
  name: CellName;
  id: string | null;
  status: "open" | "closed" | null;
  isPath?: boolean | null;
  isNearest: boolean;
};

export interface Location {
  row: number;
  col: number;
}

export type ServiceType = "ambulance" | "hospital";

export interface Service {
  id: string;
  type: ServiceType;
  status: "open" | "closed";
  location: Location;
}

interface GridState {
  grid: CellType[][];
  selectedService: ServiceType;
  services: Service[];
  selectedUser: [number, number] | null;
}

// Define the grid size (13 rows x 16 columns)
const gridRows = 13;
const gridCols = 16;

// Create an empty grid with "Z" for each cell
const gridSpaces: CellType[][] = Array(gridRows)
  .fill(null)
  .map(() => Array(gridCols).fill({ name: "Z", id: null, status: null }));

const initialState: GridState = {
  grid: gridSpaces,
  services: [],
  selectedService: "ambulance",
  selectedUser: null,
};

const gridSlice = createSlice({
  name: "grid",
  initialState,
  reducers: {
    clearPaths: (state) => {
      state.grid = state.grid.map((row) => {
        return row.map((cell) => {
          return { ...cell, isPath: false, isNearest: false };
        });
      });
    },
    setServices: (state, action: PayloadAction<Service[]>) => {
      state.services = action.payload;

      const newGrid = state.grid.map((row) => [...row]);

      action.payload.forEach((service) => {
        newGrid[service.location.row][service.location.col] = {
          name:
            service.type === "ambulance"
              ? "X"
              : service.type === "hospital"
              ? "Y"
              : "U",
          id: service.id,
          status: service.status,
          isNearest: false,
        };
      });

      state.grid = newGrid;
    },
    setUser: (state, action: PayloadAction<Location | null>) => {
      if (action.payload === null) {
        state.selectedUser = null;
        return;
      }

      const { row, col } = action.payload;

      state.selectedUser = [row, col];
    },
    setService: (state, action: PayloadAction<ServiceType>) => {
      state.selectedService = action.payload;
    },
    setNearestService: (state, action: PayloadAction<Location[]>) => {
      const { payload } = action;

      state.grid = state.grid.map((row) => {
        return row.map((cell) => {
          return { ...cell, isPath: false, isNearest: false };
        });
      });

      if (payload.length === 0) return;

      const lastIndex = payload.length - 1;

      // Iterate through all elements except the last one
      payload.slice(0, lastIndex).forEach(({ row, col }) => {
        state.grid[row][col].isPath = true;
      });
      // Mark the last element
      const { row, col } = payload[lastIndex];
      state.grid[row][col].isNearest = true;
    },
  },
});

export const {
  clearPaths,
  setService,
  setUser,
  setServices,
  setNearestService,
} = gridSlice.actions;
export default gridSlice.reducer;
