import { useQuery } from "react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fetchNearestService = async (
  currentLocation: [number, number],
  serviceType: string
) => {
  const url = new URL(`${backendUrl}/api/services/nearest`);
  url.searchParams.append("row", currentLocation[0].toString());
  url.searchParams.append("col", currentLocation[1].toString());
  url.searchParams.append("serviceType", serviceType);

  const response = await fetch(url.toString());

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch nearest service");
  }

  return await response.json();
};

export const useNearestService = (
  currentLocation: [number, number] | null,
  serviceType: string
) =>
  useQuery({
    queryKey: ["nearestService", currentLocation, serviceType],
    queryFn: () => fetchNearestService(currentLocation!, serviceType),
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!currentLocation && !!serviceType,
    retry: false,
  });
