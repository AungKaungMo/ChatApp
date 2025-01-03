// import { MoreVertical, Search, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useGetFriendDetail } from "@/hooks/use-friend-contact";
import { useChatStore } from "@/store/create-chat";
import { useEffect, useState } from "react";
import { SocketContextType, useSocket } from "@/context/SocketContext";
interface ChatHeaderProps {
  name: string;
}

const ChatHeader = ({name} : ChatHeaderProps) => {

  const { data } = useGetFriendDetail(name)
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;
  const { checkIfUserIsActive } = useSocket() as SocketContextType
  const { setSelectedChatData } = useChatStore()
  const [userActive, setUserActive] = useState(false)
  useEffect(() => {
    if(data) {
      setSelectedChatData({
        _id: data.data?._id,
        name: data.data?.name,
        email: data.data?.email,
        image: data.data?.imageUrl,
      })
    }
  }, [data])

  useEffect(() => {
    checkIfUserIsActive(name, (isActive) => {
      // if(isActive) {
        setUserActive(isActive)
      // }else {
      //   setUserActive(false)
      // }
    })
  })

  return (
    <div className="flex items-center justify-between border-b p-4">
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={data?.data?.imageUrl ? baseUrl + data?.data?.imageUrl : ""} />
        <AvatarFallback>{data?.data?.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{data?.data?.name}</div>
        {userActive && <div className="text-sm text-muted-foreground">Active now</div>}
      </div>
    </div>
    {/* <div className="flex items-center gap-3">
      <button className="btn-ghost">
        <Search className="h-5 w-5" />
      </button>
      <button className="btn-ghost">
        <Video className="h-5 w-5" />
      </button>
      <button className="btn-ghost">
        <MoreVertical className="h-5 w-5" />
      </button>
    </div> */}
  </div>
  )
}

export default ChatHeader