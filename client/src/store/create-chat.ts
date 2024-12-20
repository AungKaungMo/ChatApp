import { create } from "zustand";

export interface Message {
  _id: string;
  messageType: "text" | "file";
  receiver_id: {
    _id: string;
    name: string;
    email: string;
  } | null;
  sender_id: {
    _id: string;
    name: string;
    email: string;
  } | null;
  content: string;
  createdAt: Date | string;
  unread: false;
}

interface SelectedChatData {
  _id: string;
  email: string;
  name: string;
  image: string | null;
}

interface ChatState {
  selectedChatType: string;
  selectedChatData: SelectedChatData | null;
  selectedChatMessages: Message[];
  newContactAssignStatus: boolean;
}

interface ChatActions {
  setSelectedChatType: (type: string) => void;
  setSelectedChatData: (data: SelectedChatData) => void;
  setSelectedChatMessages: (messages: Message[]) => void;
  closeChat: () => void;
  addMessage: (message: Message) => void;
  setNewContactAssignStatus: (status: boolean) => void;
}

type ChatStore = ChatState & ChatActions;

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  selectedChatType: "",
  selectedChatData: null,
  selectedChatMessages: [],
  newContactAssignStatus: false,

  // Setters
  setSelectedChatType: (selectedChatType: string) => set({ selectedChatType }),

  setSelectedChatData: (selectedChatData: SelectedChatData) => {
    set({ selectedChatData });
  },

  setSelectedChatMessages: (selectedChatMessages: Message[]) =>
    set({ selectedChatMessages }),

  closeChat: () => {
    set({
      selectedChatType: "",
      selectedChatData: null,
      selectedChatMessages: [],
    });
  },

  addMessage: (message: Message) => {
    const { selectedChatMessages } = get();

    const updatedMessage = {
      ...message,
      // receiver_id: selectedChatType === "channel" ? message.receiver_id : null,
      // sender_id: selectedChatType === "channel" ? message.sender_id : null,
    };

    set({
      selectedChatMessages: [...selectedChatMessages, updatedMessage],
    });
  },

  setNewContactAssignStatus: (status: boolean) => {
    set({ newContactAssignStatus: status });
  },
}));
