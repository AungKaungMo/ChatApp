import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { Message } from "@/store/create-chat";

interface GetMessageListResponse {
  status: boolean;
  message: string;
  data: Message[];
}

const getMessageList = async (id: string) => {
  try {
    if (!id) return;
    const { data } = await axiosInstance.get("message/get-messages", {
      params: { id: id },
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Get Message list failed.");
    }
  }
};

export const useGetMessageList = (id: string) => {
  return useQuery<GetMessageListResponse, Error>({
    queryKey: ["messages", id],
    queryFn: () => getMessageList(id),
  });
};
