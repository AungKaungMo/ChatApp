import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import { useGetMessageList } from "@/hooks/use-message";
// import { Spinner } from "@/assets/icons/Spinner";
import { useLoginStore } from "@/store/auth.store";
import { Message, useChatStore } from "@/store/create-chat";
import moment from "moment";

interface ChatMessageProps {
  name: string;
}

const ChatMessage = ({ name }: ChatMessageProps) => {
  const { user } = useLoginStore();
  const scrollRef = useRef<any>();
  const { data } = useGetMessageList(name);
  const {
    selectedChatMessages,
    setSelectedChatMessages,
  } = useChatStore();

  const messageList: Message[] = data?.data ?? [];

  const [activeMessage, setActiveMessage] = useState("");

  const renderMessages = () => {
    // let lastDate: Date | null | string = null;

    return selectedChatMessages.map((message) => {
      // const messageDate = moment(message.createdAt).format("YYYY-MM-DD");
      // const showDate = messageDate !== lastDate;
      // lastDate = messageDate;

      return (
        <div
          key={message._id}
          className={`flex ${
            message.sender_id?._id === user?._id ? "justify-end" : "items-start"
          } mb-3`}
        >
          {message.receiver_id?._id === user?._id && (
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={"aa"} alt="User avatar" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          )}
          <div
            className={`flex flex-col ${
              message.sender_id?._id === user?._id ? "items-end" : "items-start"
            }`}
          >
            {message.messageType === "text" && (
              <div className="flex items-center gap-2">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveMessage(activeMessage ? "" : message._id);
                  }}
                  className={`rounded-2xl px-4 py-2 max-w-[100%] cursor-pointer ${
                    message.sender_id?._id === user?._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-800"
                  } `}
                >
                  <p className="text-md">{message.content} </p>
                </div>
              </div>
            )}
            {/* <Spinner /> */}
            <span
              className={`text-xs text-gray-500 mt-1 ${
                message._id === activeMessage ? "block" : "hidden"
              }`}
            >
              {moment(message.createdAt).format("YYYY-MM-DD")}
            </span>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if(messageList && messageList.length > 0) {
      setSelectedChatMessages(messageList as Message[]);
    }
  }, [messageList])

  useEffect(() => {
    if(scrollRef.current) {
      scrollRef.current.scrollIntoView({behavior: "smooth"})
    }
  }, [selectedChatMessages])

  return (
    <div onClick={() => setActiveMessage("")}>
      <div className=" mx-auto py-4">{renderMessages()}</div>
    </div>
  );
};

export default ChatMessage;
