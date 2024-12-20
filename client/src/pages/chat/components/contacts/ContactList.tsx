import ContactItem from "./ContactItem"
import { useGetFriendList } from '@/hooks/use-friend-contact'
import { useChatStore } from "@/store/create-chat";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ContactList = () => {
  const {data, refetch} = useGetFriendList();
  const [contacts, setContacts] = useState(data?.data || [])
  const { newContactAssignStatus, setNewContactAssignStatus , setSelectedChatMessages } = useChatStore()
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const nameValue = urlParams.get("name");

  useEffect(() => {
    setContacts(data?.data || []);
    if(data?.data) {
      setContacts(data.data)
    }

  }, [data?.data])
  
  useEffect(() => {
    if(newContactAssignStatus) {
      refetch();
      setNewContactAssignStatus(false);
    }
  }, [newContactAssignStatus])
  
  useEffect(()=>{
    if(nameValue) {
      setSelectedChatMessages([])
    }
  }, [nameValue])

  return (
    <div className=" space-y-3 mt-2">
    { contacts && contacts.length > 0 ? contacts?.map((contact) => (
      <div key={contact._id}>
      <ContactItem contact={contact} nameValue={nameValue || ""} />
      <div className=" bg-gray-200 h-[1px]"/>
      </div>
    )) : (
      <div className="mt-8 text-center">
         <div>
         No Friends list
          </div>  
          <Link className="text-sm underline hover:text-gray-600" to='/contacts'> Add Contacts</Link>
        </div>
    )}
  </div>
  )
}

export default ContactList