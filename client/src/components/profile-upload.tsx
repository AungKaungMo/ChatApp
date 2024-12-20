// import { useState, useRef } from 'react'
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// // import { Button } from "@/components/ui/button"
// import { Upload, User } from 'lucide-react'
// import { useUploadImage } from '@/hooks/use-image'

// export default function ProfileUpload({propsAvatar}: {
//   propsAvatar: string,
// }) {
//   const [avatar, setAvatar] = useState<string | null>(propsAvatar || null)
//   const [isUploading, setIsUploading] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       if (file.type.startsWith('image/')) {
//         setIsUploading(true)
//         const reader = new FileReader()
//         reader.onloadend = () => {
//           setAvatar(reader.result as string)
//           setIsUploading(false)
//         }
//         reader.readAsDataURL(file)
//         const formData = new FormData();
//         formData.append("file", file);

//         useUploadImage(formData)

//       } else {
//         alert('Please upload an image file')
//       }
//     }
//   }

//   const handleUploadClick = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div className="flex flex-col items-center space-y-4">
//       <Avatar className="w-32 h-32 cursor-pointer border-2" onClick={handleUploadClick}>
//         <AvatarImage src={avatar || ''} alt="Profile picture" />
//         <AvatarFallback>
//           {isUploading ? (
//             <div className="animate-pulse bg-gray-200 rounded-full w-full h-full flex items-center justify-center">
//               <Upload className="w-8 h-8 text-gray-400" />
//             </div>
//           ) : (
//             <User className="w-8 h-8" />
//           )}
//         </AvatarFallback>
//       </Avatar>
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleFileChange}
//         accept="image/*"
//         className="hidden"
//       />
//       {/* <Button onClick={handleUploadClick} disabled={isUploading}>
//         {isUploading ? 'Uploading...' : 'Upload Profile Picture'}
//       </Button> */}
//     </div>
//   )
// }



import { useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, User } from 'lucide-react';
import { useUploadImage } from '@/hooks/use-image';
import { useLoginStore } from '@/store/auth.store';

export default function ProfileUpload({ propsAvatar }: { propsAvatar: string }) {
  const [avatar, setAvatar] = useState<string | null>(propsAvatar || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the custom hook at the top level of the component
  const uploadImageMutation = useUploadImage();

  const { user, setUser } = useLoginStore()
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setIsUploading(true);

        // Update avatar preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Create FormData for uploading
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await uploadImageMutation.mutateAsync(formData);
          if (response.status && user && user._id && user.name && user.email) {
            setUser({
              ...user,
              imageUrl: response.data?.url,
            });
          }
        } catch (error) {
          console.error('Error uploading image:', error);
        } finally {
          setIsUploading(false);
        }
      } else {
        alert('Please upload an image file');
      }
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32 cursor-pointer border-2" onClick={handleUploadClick}>
        <AvatarImage src={avatar || ''} alt="Profile picture" />
        <AvatarFallback>
          {isUploading ? (
            <div className="animate-pulse bg-gray-200 rounded-full w-full h-full flex items-center justify-center">
              <Upload className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <User className="w-8 h-8" />
          )}
        </AvatarFallback>
      </Avatar>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
