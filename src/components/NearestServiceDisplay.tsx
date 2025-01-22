import { setNearestService } from "@/store/gridSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNearestService } from "../hooks/useNearestService";
import { RootState } from "../store/store";

type ErrorResponse = {
  message: string;
};

const NearestServiceDisplay: React.FC = () => {
  const gridState = useSelector((state: RootState) => state.grid);

  const dispatch = useDispatch();

  // Call the hook unconditionally
  const { data, isLoading, isSuccess, isError, error } = useNearestService(
    gridState.selectedUser!,
    gridState.selectedService
  );

  useEffect(() => {
    if (isLoading) return;

    if (isSuccess) {
      dispatch(setNearestService(data?.paths ?? []));
    } else if (isError) {
      dispatch(setNearestService([]));
      toast.error((error as ErrorResponse)?.message);
    }
  }, [isLoading, isSuccess, isError, error, data, dispatch]);

  // Handle missing user or service selection
  if (!gridState.selectedUser || !gridState.selectedService) {
    return <p>Please select a user.</p>;
  }

  // Handle loading state
  if (isLoading) return <p>Loading...</p>;

  // Handle the case where no data is returned
  if (!data || isError) {
    return <p>{(error as ErrorResponse)?.message}</p>;
  }

  return (
    <p>
      Nearest Service: {gridState.selectedService} at distance {data.distance}{" "}
      blocks.
    </p>
  );
};

export default NearestServiceDisplay;
