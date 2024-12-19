import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";

export interface GetFriendListResponse {
  status: boolean;
  message: string;
  data: IFriendList[];
}

export interface IFriendList {
  _id: string;
  lastMessageTime?: string;
  lastMessageText?: string;
  imageUrl?: string;
  name: string;
  email: string;
  unread: boolean;
}

export interface GetFriendDetailResponse {
  status: boolean;
  message: string;
  data: IFriendDetail;
}

export interface IFriendDetail {
  _id: string;
  name: string;
  email: string;
  imageUrl: string;
}

const getFriendList = async () => {
  try {
    const { data } = await axiosInstance.get("contact/friends");
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Get friend list failed.");
    }
  }
};

const getFriendDetail = async (id: string) => {
  try {
    const { data } = await axiosInstance.get("contact/friends/" + id);
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Get friend detail failed.");
    }
  }
};

export const useGetFriendList = () => {
  return useQuery<GetFriendListResponse, Error>({
    queryKey: ["friends"],
    queryFn: getFriendList,
  });
};

export const useGetFriendDetail = (id: string) => {
  return useQuery<GetFriendDetailResponse, Error>({
    queryKey: ["friend-detail", id],
    queryFn: () => getFriendDetail(id),
  });
};
