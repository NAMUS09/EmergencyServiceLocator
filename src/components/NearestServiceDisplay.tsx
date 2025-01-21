import { setNearestService } from "@/store/gridSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNearestService } from "../hooks/useNearestService";
import { RootState } from "../store/store";

const NearestServiceDisplay: React.FC = () => {
  const gridState = useSelector((state: RootState) => state.grid);

  const dispatch = useDispatch();

  // Call the hook unconditionally
  const { data, isLoading } = useNearestService(
    gridState.selectedUser!,
    gridState.selectedService
  );

  useEffect(() => {
    if (!isLoading && data) dispatch(setNearestService(data.paths));
  }, [isLoading, data, dispatch]);

  // Handle missing user or service selection
  if (!gridState.selectedUser || !gridState.selectedService) {
    return <p>Please select a user.</p>;
  }

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle the case where no data is returned
  if (!data) {
    return <p>No nearest service found.</p>;
  }

  return <p>Nearest Service: at distance {data.distance} blocks</p>;
};

export default NearestServiceDisplay;
