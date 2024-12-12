import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ContactItem = ({ contact }: { contact: any }) => {
  return (
    <div className="flex p-3 items-center gap-3 rounded-lg hover:bg-gray-100 cursor-pointer">
    <Avatar className="h-10 w-10">
      <AvatarImage src={contact.avatar} />
      <AvatarFallback>{contact.name[0]}</AvatarFallback>
    </Avatar>
    <div className="flex-1 overflow-hidden">
      <div className="font-medium">{contact.name}</div>
      <div className="text-sm text-muted-foreground truncate">
        {contact.lastMessage}
      </div>
    </div>
    {contact.unread && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
  </div>
  )
}

export default ContactItem