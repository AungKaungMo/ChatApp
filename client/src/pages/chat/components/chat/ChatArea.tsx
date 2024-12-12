import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatMessage from "./ChatMessage"
import { useState } from "react"

export interface MessageProps {
  id: string,
  message: string,
  type: "sender" | "receiver"
}
const ChatArea = () => {
  const [messages, setMessages] = useState<MessageProps[]>([
    {
      id: 'feafjoif',
      message: "WAH HAHAHAHAHA DO U KNOW WHO AM I????",
      type: "receiver"
    },
    {
      id: 'feafjfeaoif',
      message: "How the hell do i know, who the fuck r you? get out of my face now. i'll kill you mother fucker",
      type: "sender"
    }
  ]);
  const handleMessage = (message: string) => {
    setMessages((prev: MessageProps[]) => [...prev, {id: 'feiafje', message: message, type: "sender"}]);
  };

  return (
    <div className="flex flex-col">
    <ChatHeader />
    <ScrollArea className="flex-1 p-4">
      {/* Chat messages can be dynamically rendered here */}
      <ChatMessage messages={messages}/>
    </ScrollArea>
    <ChatInput handleMessage={handleMessage}  />
  </div>

  )
}

export default ChatArea