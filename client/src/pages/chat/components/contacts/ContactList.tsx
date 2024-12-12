import contacts from "../../data/contacts"
import ContactItem from "./ContactItem"

const ContactList = () => {
  return (
    <div className=" space-y-3 mt-2">
    {contacts.map((contact) => (
      <div key={contact.id}>
      <ContactItem contact={contact}  />
      <div className=" bg-gray-200 h-[1px]"/>
      </div>
    ))}
  </div>
  )
}

export default ContactList