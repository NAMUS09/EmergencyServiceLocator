import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearPaths, ServiceType, setService } from "../store/gridSlice";
import { RootState } from "../store/store";

const ServiceSelector: React.FC = () => {
  const dispatch = useDispatch();
  const selectedService = useSelector(
    (state: RootState) => state.grid.selectedService
  ); // Access the selected service from the Redux store

  const handleServiceChange = (service: ServiceType) => {
    dispatch(clearPaths());
    dispatch(setService(service));
  };

  return (
    <div className="mb-4">
      <button
        onClick={() => handleServiceChange("ambulance")}
        className={`px-4 py-2 rounded mr-2 ${
          selectedService === "ambulance" ? "bg-red-700" : "bg-red-500"
        } text-white`}
      >
        Ambulance
      </button>
      <button
        onClick={() => handleServiceChange("hospital")}
        className={`px-4 py-2 rounded ${
          selectedService === "hospital" ? "bg-blue-700" : "bg-blue-500"
        } text-white`}
      >
        Hospital
      </button>
    </div>
  );
};

export default ServiceSelector;
