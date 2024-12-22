import { useLoginStore } from "@/store/auth.store";
import { useChatStore } from "@/store/create-chat";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from 'socket.io-client'
import { Message } from "@/store/create-chat";

export const useSocket = () => {
    return useContext(SocketContext)
}

export interface SocketContextType {
    [x: string]: any;
    socket: Socket | null;
    checkIfUserIsActive: (userId: string, callback: (isActive: boolean) => void) => void;
}  

const SocketContext = createContext<SocketContextType | null>(null);
const baseUrl = import.meta.env.VITE_APP_BASE_IMAGE_URL;

export const  SocketProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const { user } = useLoginStore();
    const { selectedChatData, addMessage, setNewContactAssignStatus } = useChatStore()
    const selectedChatDataRef = React.useRef(selectedChatData);

    useEffect(() => {
        selectedChatDataRef.current = selectedChatData;
      }, [selectedChatData]);
      
    useEffect(() => {
        if(!user?._id) return;
            const newSocket = io(baseUrl, {
                withCredentials: true,
                query: { userId: user._id },
                transports: ['websocket'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000
            })

            setSocket(newSocket);
          
            newSocket.on("connect",() => {
                console.log("Connected")
            });

            const handleRecieveMessage = (message: Message) => {
                const chatData = selectedChatDataRef.current;
                if((chatData?._id === message.sender_id?._id || chatData?._id === message.receiver_id?._id)) {
                    addMessage(message)
                    setNewContactAssignStatus(true)
                }
            }

            newSocket.on("recieveMessage", handleRecieveMessage);

            return () => {
                newSocket?.disconnect()
            }
    }, [user?._id, addMessage])

    const checkIfUserIsActive = (userId: string, callback: (isActive: boolean) => void) => {
        if(socket) {
            socket.emit("checkIfActive", userId, callback)
        }
    }

    return (
        <SocketContext.Provider value={{socket, checkIfUserIsActive}}>
            {children}
        </SocketContext.Provider>
    )
}   