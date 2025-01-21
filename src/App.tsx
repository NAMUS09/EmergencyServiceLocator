import { useSelector } from "react-redux";
import MatrixGrid from "./components/MatrixGrid";
import NearestServiceDisplay from "./components/NearestServiceDisplay";
import ServiceSelector from "./components/ServiceSelector";
import { RootState } from "./store/store";

const SelectedService = () => {
  const service = useSelector((state: RootState) => state.grid.selectedService);
  return (
    <p>
      <span className="font-bold"> Selected Service:</span> {service}
    </p>
  );
};

function App() {
  return (
    <div className="flex">
      <div className="w-1/4 p-4 border-r">
        <h1 className="text-2xl font-bold mb-4">Emergency Service Locator</h1>
        <ServiceSelector />
        <SelectedService />
        <NearestServiceDisplay />
      </div>
      <div className="w-3/4 p-4">
        <MatrixGrid />
      </div>
    </div>
  );
}

export default App;
