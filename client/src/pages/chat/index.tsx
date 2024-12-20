import { useLocation } from "react-router-dom";
import ChatArea from "./components/chat/ChatArea";
import ChatNavbar from "./components/chat/ChatNavbar";
import LeftSidebar from "./components/sidebar/LeftSidebar";
import AllUserContact from "./components/contacts/AllUserContact";
// import RightSidebar from "./components/sidebar/RightSidebar"

const index = () => {
  const location = useLocation();

  return (
    <div className="h-[90vh] bg-white font-serif">
      <ChatNavbar />

      {/* 300px 1fr 300px */}
      {location.pathname.includes("chat") ? (
        <div
          className="grid h-full"
          style={{ gridTemplateColumns: "300px 1fr " }}
        >
          <LeftSidebar />
          <ChatArea />
        </div>
      ) : (
        <AllUserContact />
      )}
      {/* <RightSidebar /> */}
    </div>
  );
};

export default index;
