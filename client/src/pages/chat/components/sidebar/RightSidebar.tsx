import {Tabs} from "@/components/ui/tabs"
import TabsContent from "./TabContent"

const RightSidebar = () => {
  return (
    <div className="border-l">
    <Tabs />
    <div className="p-4">
      <TabsContent />
    </div>
  </div>
  )
}

export default RightSidebar