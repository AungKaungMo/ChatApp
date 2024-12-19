import { Paperclip, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useChatStore } from "@/store/create-chat";
import { useSocket } from "@/context/SocketContext";
import { useLoginStore } from "@/store/auth.store";


const ChatInput = () => {
  const [message, setMessage] = useState("");
  const { selectedChatData, selectedChatMessages } = useChatStore();
  const { user } = useLoginStore();
  const socket = useSocket();

  const handleMessaging = (e: any) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    // if(selectedChatType === "contact") {
      socket?.emit("sendMessage", {
        sender_id: user?._id,
        content: message,
        receiver_id: selectedChatData?._id,
        messageType: "text"
      }, (
        ack: {success: boolean, message: string}) => {
          if(!ack.success) {
            console.log("Message not sent:", ack.message)
          }else {
            
          }
        })
    // }
    console.log(selectedChatData, 'selected')
    setMessage("");
  }

  return (
    <div className="border-t p-4">
    <div className="flex items-center gap-2">
      <button className="btn-ghost">
        <Paperclip className="h-4 w-4" />
      </button>
      <Input placeholder="Type a message here..." value={message} onChange={handleMessaging} className="flex-1" />
      <button className="btn-primary" onClick={sendMessage}>
        <Send className="h-4 w-4" />
      </button>
    </div>
  </div>
  )
}

export default ChatInput