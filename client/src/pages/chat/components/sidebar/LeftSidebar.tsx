import { ScrollArea } from "@/components/ui/scroll-area";
import ContactList from "../contacts/ContactList";

const LeftSidebar = () => {
    return (
        <div className="border-r">
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <ContactList />
          </ScrollArea>
        </div>
      );
}

export default LeftSidebar