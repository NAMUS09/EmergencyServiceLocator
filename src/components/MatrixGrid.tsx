import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useUpdateService } from "@/hooks/useUpdateService";
import toast from "react-hot-toast";
import { MdLocationPin } from "react-icons/md";
import { useQueryClient } from "react-query";
import { useGetAllServices } from "../hooks/useGetAllService";
import { CellType, clearPaths, setServices, setUser } from "../store/gridSlice";
import { RootState } from "../store/store";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type ServiceDialogProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cell: CellType;
};

const ServiceDialog: React.FC<ServiceDialogProps> = ({
  cell,
  open,
  setOpen,
}) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    cell?.status ?? "open"
  );

  const queryClient = useQueryClient();

  const { mutate } = useUpdateService();

  useEffect(() => {
    setSelectedStatus(cell?.status ?? "open");
  }, [cell?.status]);

  if (!cell) return null;

  const title =
    cell.name === "X" ? "Update Ambulance Status" : "Update Hospital Status";

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Update the service status
    mutate(
      { id: cell.id!, status: selectedStatus },
      {
        onSuccess: () => {
          setOpen(false);
          toast.success("Service status updated successfully");
          queryClient.invalidateQueries("allServices");
        },
        onError: () => {
          toast.error("Failed to update service status");
        },
      }
    );

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <form onSubmit={onSave}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription> </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label>Status:</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const MatrixGrid: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cell, setCell] = useState<CellType | null>(null);
  const { data, isLoading } = useGetAllServices();
  const grid = useSelector((state: RootState) => state.grid.grid);

  const dispatch = useDispatch();

  const handleCellClick = (row: number, col: number, cell: CellType) => {
    if (cell.name === "Z") return;

    if (cell.name === "X" || cell.name === "Y") {
      setOpen(true);
      setCell(cell);
      return;
    }

    // Update the grid with the selected service type
    dispatch(clearPaths());
    dispatch(setUser({ row, col }));
  };

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(setServices(data));
    }
  }, [isLoading, data, dispatch]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-16 gap-2">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              onClick={() => handleCellClick(rowIndex, colIndex, cell)}
              className={`w-8 h-8 flex items-center justify-center border ${
                cell.name === "X"
                  ? "bg-red-500 cursor-pointer"
                  : cell.name === "Y"
                  ? "bg-blue-500 cursor-pointer"
                  : cell.name === "U"
                  ? "bg-green-500 cursor-pointer"
                  : cell.isPath
                  ? "bg-yellow-500"
                  : "bg-gray-200"
              }`}
            >
              {cell.isNearest && <MdLocationPin />} {cell.name}
            </div>
          ))}
        </div>
      ))}
      <ServiceDialog open={open} setOpen={setOpen} cell={cell!} />
    </div>
  );
};

export default MatrixGrid;
