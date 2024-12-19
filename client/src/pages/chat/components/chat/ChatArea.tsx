import ChatHeader from "./ChatHeader"
import ChatInput from "./ChatInput"
import { ScrollArea } from "@/components/ui/scroll-area"
import ChatMessage from "./ChatMessage"
import { useEffect, useState } from "react"

const ChatArea = () => {

  const [name, setName] = useState("")

  const updateNameFromQuery = () => {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const nameValue = urlParams.get("name")
    setName(nameValue || "")
  }

  useEffect(() => {
    updateNameFromQuery();

    const handleCustomNavigation = () => updateNameFromQuery();

    // Listen to popstate (for browser back/forward buttons)
    window.addEventListener("popstate", handleCustomNavigation);

    // Override pushState and replaceState to detect query changes
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      originalPushState.apply(window.history, args);
      window.dispatchEvent(new Event("pushstate"));
    };

    window.history.replaceState = function (...args) {
      originalReplaceState.apply(window.history, args);
      window.dispatchEvent(new Event("replacestate"));
    };

    window.addEventListener("pushstate", handleCustomNavigation);
    window.addEventListener("replacestate", handleCustomNavigation);

    // Cleanup listeners and restore original functions
    return () => {
      window.removeEventListener("popstate", handleCustomNavigation);
      window.removeEventListener("pushstate", handleCustomNavigation);
      window.removeEventListener("replacestate", handleCustomNavigation);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, []);


  return (
    <div className="flex flex-col">
    {name && <ChatHeader name={name}/>}
    <ScrollArea className="flex-1 p-4">
      {/* Chat messages can be dynamically rendered here */}
      {name && <ChatMessage name={name}/>}
    </ScrollArea>
    <ChatInput  />
  </div>

  )
}

export default ChatArea