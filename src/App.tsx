import { useDispatch, useSelector } from "react-redux";
import MatrixGrid from "./components/MatrixGrid";
import NearestServiceDisplay from "./components/NearestServiceDisplay";
import ServiceSelector from "./components/ServiceSelector";
import { Button } from "./components/ui/button";
import { clearPaths, setUser } from "./store/gridSlice";
import { RootState } from "./store/store";

const SelectedService = () => {
  const service = useSelector((state: RootState) => state.grid.selectedService);
  return (
    <p>
      <span className="font-bold"> Selected Service:</span> {service}
    </p>
  );
};

const ClearSelectedUser = () => {
  const selectedUser = useSelector(
    (state: RootState) => state.grid.selectedUser
  );

  const dispatch = useDispatch();

  const handleClear = () => {
    if (selectedUser) {
      dispatch(clearPaths());
      dispatch(setUser(null));
    }
  };

  return (
    <Button
      disabled={!selectedUser}
      variant={"destructive"}
      className="my-2 px-4 py-2 rounded"
      onClick={handleClear}
    >
      Clear User
    </Button>
  );
};

function App() {
  return (
    <div className="md:flex">
      <div className="md:w-1/4 p-2 md:p-4 md:border-r ">
        <h1 className="text-2xl font-bold mb-4">Emergency Service Locator</h1>
        <ServiceSelector />
        <SelectedService />
        <NearestServiceDisplay />
        <ClearSelectedUser />
      </div>
      <div className="overflow-hidden  md:w-3/4 p-2 md:p-4">
        <MatrixGrid />
      </div>
    </div>
  );
}

export default App;
