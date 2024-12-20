import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

interface UpdateProfileInput {
  id: string;
  name: string;
}

export interface UpdateProfileResponse {
  status: boolean;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

const updateProfile = async ({
  name,
  id,
}: UpdateProfileInput): Promise<UpdateProfileResponse> => {
  try {
    const { data } = await axiosInstance.put("auth/update-profile/" + id, {
      name: name,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Login failed.");
    }
  }
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<UpdateProfileResponse, Error, UpdateProfileInput>({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "updateProfile" });
    },
  });
};
