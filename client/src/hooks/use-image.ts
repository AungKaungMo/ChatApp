// import axiosInstance from "@/api/axiosInstance";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface ImageResponse {
//   status: boolean;
//   message: string;
//   data: {
//     _id: string;
//     url: string;
//     type: string;
//   };
// }

// const uploadImage = async (formdata: any): Promise<ImageResponse> => {
//   try {
//     const { data } = await axiosInstance.post(
//       "profile/upload-image",
//       formdata,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );
//     return data;
//   } catch (error: any) {
//     if (error.response) {
//       throw error.response.data;
//     } else {
//       throw new Error("Upload image failed.");
//     }
//   }
// };

// export const useUploadImage = (formdata: any) => {
//   const queryClient = useQueryClient();

//   return useMutation<ImageResponse, Error, File>({
//     mutationFn: (formdata: any) => uploadImage(formdata),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["upload-image"] });
//     },
//   });
// };

import axiosInstance from "@/api/axiosInstance";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface ImageResponse {
  status: boolean;
  message: string;
  data: {
    _id: string;
    url: string;
    type: string;
  };
}

const uploadImage = async (formdata: FormData): Promise<ImageResponse> => {
  try {
    const { data } = await axiosInstance.post(
      "profile/upload-image",
      formdata,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error: any) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("Upload image failed.");
    }
  }
};

export const useUploadImage = () => {
  const queryClient = useQueryClient();

  return useMutation<ImageResponse, Error, FormData>({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["upload-image"] });
    },
  });
};
