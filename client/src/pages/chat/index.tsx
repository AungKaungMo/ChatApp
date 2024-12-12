import ChatArea from "./components/chat/ChatArea"
import ChatNavbar from "./components/chat/ChatNavbar"
import LeftSidebar from "./components/sidebar/LeftSidebar"
import RightSidebar from "./components/sidebar/RightSidebar"

const index = () => {
  return (
    <div className="h-[92vh] bg-white font-serif">
     <ChatNavbar />
    <div className="grid h-full" style={{ gridTemplateColumns: "300px 1fr 300px" }}>
      <LeftSidebar />
      <ChatArea />
      <RightSidebar />
    </div>
  </div>
  )
}

export default index