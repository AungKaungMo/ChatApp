import { useLoginStore } from "@/store/auth.store";
import { useChatStore } from "@/store/create-chat";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client'
import { Message } from "@/store/create-chat";

export const useSocket = () => {
    return useContext(SocketContext)
}

const SocketContext = createContext<Socket | null>(null);
const baseUrl = 'http://localhost:8000/';

export const  SocketProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user } = useLoginStore();
    const { selectedChatData, addMessage } = useChatStore()
    const selectedChatDataRef = React.useRef(selectedChatData);

    useEffect(() => {
        selectedChatDataRef.current = selectedChatData;
      }, [selectedChatData]);
      
    useEffect(() => {
        if(!user?._id) return;
            const newSocket = io(baseUrl, {
                withCredentials: true,
                query: { userId: user._id },
                transports: ['websocket']
            })

            setSocket(newSocket);
          
            newSocket.on("connect",() => {
                console.log("Connected")
            });

            const handleRecieveMessage = (message: Message) => {
                const chatData = selectedChatDataRef.current;
                console.log(chatData?._id + " === " + message.sender_id?._id +  " === " + message.receiver_id?._id)
                if((chatData?._id === message.sender_id?._id || chatData?._id === message.receiver_id?._id)) {
                    addMessage(message)
                }
            }

            newSocket.on("recieveMessage", handleRecieveMessage);

            return () => {
                newSocket?.disconnect()
            }
    }, [user?._id, addMessage])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}   