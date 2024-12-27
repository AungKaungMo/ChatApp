import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { IFriendList } from "@/hooks/use-friend-contact";
import { useChatStore } from "@/store/create-chat";
import { useNavigate } from "react-router-dom";

const ContactItem = ({ contact, nameValue }: { contact: IFriendList, nameValue: string }) => {
  const navigate = useNavigate()
  const baseUrl = import.meta.env.VITE_APP_BASE_URL;


  const { setSelectedChatData } = useChatStore()
  
  return contact && (
    <div className={`flex p-3 items-center gap-3 rounded-lg cursor-pointer ${nameValue === contact._id ? 'bg-gray-200' : 'hover:bg-gray-200'}`} onClick={() => {
      setSelectedChatData({
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        image: contact.imageUrl || ""
      })
      navigate('/chat?name='+contact._id)
    }}>
    <Avatar className="h-10 w-10">
      <img src={contact.imageUrl ? baseUrl + contact.imageUrl : ""} />
      <AvatarFallback>{contact.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="font-medium">{contact.name}</div>
      <div className="text-sm text-muted-foreground truncate">
        {contact.lastMessageText}
      </div>
    </div>
    {(contact.unread && nameValue !== contact._id) && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
  </div>
  )
}

export default ContactItem