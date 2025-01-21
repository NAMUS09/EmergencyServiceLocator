import { useMutation } from "react-query";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const updateService = async (id: string, status: string) => {
  const url = `${backendUrl}/api/services/update`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serviceId: id, status }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update service");
  }

  return response.json(); // Return the parsed JSON response
};

export const useUpdateService = () =>
  useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      updateService(id, status),
  });
