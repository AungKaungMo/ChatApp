import { Paperclip, Send } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface PropsType {
  handleMessage: (message: string) => void;
}

const ChatInput = ({handleMessage} :PropsType) => {
  const [message, setMessage] = useState("");

  const handleMessaging = (e: any) => {
    setMessage(e.target.value);
  }

  const sendMessage = () => {
    handleMessage(message);
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