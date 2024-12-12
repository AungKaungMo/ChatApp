import { MoreVertical, Search, Video } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between border-b p-4">
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">Username</div>
        <div className="text-sm text-muted-foreground">Active now</div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <button className="btn-ghost">
        <Search className="h-5 w-5" />
      </button>
      <button className="btn-ghost">
        <Video className="h-5 w-5" />
      </button>
      <button className="btn-ghost">
        <MoreVertical className="h-5 w-5" />
      </button>
    </div>
  </div>
  )
}

export default ChatHeader