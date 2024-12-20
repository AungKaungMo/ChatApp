import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export interface UnknownFriends extends Omit<IFriendDetail, "imageUrl"> {
  image: {
    url: string;
  };
}

export interface UnknownFriendsListResponse {
  status: boolean;
  message: string;
  data: UnknownFriends[];
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

const getAllUnknownFriends = async () => {
  try {
    const { data } = await axiosInstance.get("contact/unknown-friends");
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Get friend list failed.");
    }
  }
};

const getSearchFriends = async (search: string) => {
  try {
    const { data } = await axiosInstance.post("contact/search", {
      search,
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Get friend list failed.");
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

export const useGetAllUnknownFriends = () => {
  return useQuery<UnknownFriendsListResponse, Error>({
    queryKey: ["unknown-friends"],
    queryFn: getAllUnknownFriends,
  });
};

export const useGetSearchFriends = () => {
  const queryClient = useQueryClient();

  return useMutation<UnknownFriendsListResponse, Error, string>({
    mutationFn: getSearchFriends,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["search-friends"] });
    },
  });
};
