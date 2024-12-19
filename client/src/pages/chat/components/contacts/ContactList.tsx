import ContactItem from "./ContactItem"
import { useGetFriendList } from '@/hooks/use-friend-contact'
import { IFriendList } from "@/hooks/use-friend-contact";

const ContactList = () => {
  const {data, isPending} = useGetFriendList();

  const contacts: IFriendList[] = data?.data ?? [];
  
  return (
    <div className=" space-y-3 mt-2">
    {contacts?.map((contact) => (
      <div key={contact._id}>
      <ContactItem contact={contact} />
      <div className=" bg-gray-200 h-[1px]"/>
      </div>
    ))}
  </div>
  )
}

export default ContactList