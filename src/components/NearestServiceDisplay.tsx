import { useSelector } from "react-redux";
import { useNearestService } from "../hooks/useNearestService";
import { RootState } from "../store/store";

const NearestServiceDisplay: React.FC = () => {
  const gridState = useSelector((state: RootState) => state.grid);

  // Call the hook unconditionally
  const { data, isLoading, error } = useNearestService(
    gridState.selectedUser!,
    gridState.selectedService
  );

  // Handle missing user or service selection
  if (!gridState.selectedUser || !gridState.selectedService) {
    return <p>Please select a user.</p>;
  }

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle error state
  if (error) return <p>Error: {error.message}</p>;

  // Handle the case where no data is returned
  if (!data) {
    return <p>No nearest service found.</p>;
  }

  return (
    <p>
      Nearest Service: {data.name} at distance {data.distance} meters
    </p>
  );
};

export default NearestServiceDisplay;
