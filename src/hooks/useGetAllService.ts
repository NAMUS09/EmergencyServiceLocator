import { useQuery } from "react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchAllServices = async () => {
  const url = new URL(`${backendUrl}/api/services/all`);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch services");
  }

  return await response.json();
};

export const useGetAllServices = () =>
  useQuery({
    queryKey: ["allServices"],
    queryFn: () => fetchAllServices(),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    retry: false,
  });
