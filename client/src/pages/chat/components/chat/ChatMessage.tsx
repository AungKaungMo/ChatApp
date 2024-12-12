import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageProps } from "./ChatArea";
import { useState } from "react";
import { Spinner } from "@/assets/icons/Spinner";

interface PropsType {
  messages: MessageProps[];
}

const ChatMessage = (messages: PropsType) => {

  const [activeMessage, setActiveMessage] = useState("");
  return (
    <div onClick={() => setActiveMessage("")}>
      <div className=" mx-auto py-4">
        {messages.messages?.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.type === "sender" ? "justify-end" : "items-start"
            } mb-2`}
          >
            {message.type === "receiver" && (
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={"aa"} alt="User avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`flex flex-col ${
                message.type === "sender" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMessage(message.id)
                }}
                className={`rounded-2xl px-4 py-2 max-w-[100%] cursor-pointer ${
                  message.type === "sender"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                } `}
              >
                <p className="text-md">{message.message} </p>
              </div>
              <Spinner />
              </div>
              <span className={`text-xs text-gray-500 mt-1 ${message.id === activeMessage ? 'opacity-100' : 'opacity-0'}`}>10:00 AM</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessage;
