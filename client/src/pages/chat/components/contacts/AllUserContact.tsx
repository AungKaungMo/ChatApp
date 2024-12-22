import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useGetAllUnknownFriends, useGetSearchFriends } from "@/hooks/use-friend-contact";
import { useToast } from "@/hooks/use-toast";
// import { useEffect, useState } from "react";
import { debounce } from 'lodash';
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllUserContact = () => {
  // const [search, setSearch] = useState("");
  const { data } = useGetAllUnknownFriends();
  const [search, setSearch] = useState("");
  const { mutate: searchMutate } = useGetSearchFriends();
  const baseUrl = import.meta.env.VITE_APP_BASE_IMAGE_URL;

  const [contactList, setContactList] = useState(data?.data || []);
  const { toast } = useToast()
  const navigate = useNavigate();
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      if(searchValue) {
        searchMutate(searchValue,  {
          onSuccess: (data) => {
            setContactList(data?.data);
          },
          onError: (error: any) => {
            toast({
              variant: 'destructive',
              duration: 1500,
              title: "Error",
              description: error?.error || "Login failed."
            })
            setSearch("")
          }
  })
      }else {
        setContactList(data?.data || []);
      }
    }, 600), 
  [searchMutate, data?.data]
  )

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cleanup debounced calls
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (data?.data) {
      setContactList(data.data);
    }
  }, [data]);

  const handleInputChange = (e: any) => {
    const searchValue = e.target.value;
    setSearch(searchValue)
    debouncedSearch(searchValue)
  }
  
  return (
    <div className="flex md:justify-center flex-col items-center gap-4 mt-8 pb-8">
      <div className=" md:w-4/12 w-10/12 mx-auto">
        <Input className="w-full"
         value={search}
         onChange={handleInputChange}
         placeholder="Search Contact"
          />
      </div>
      {contactList && contactList.length > 0 ? contactList?.map(contact => (
        <div
          onClick={() => navigate('/chat?name='+contact._id)}
          key={contact._id}
          className={`flex md:w-4/12 w-10/12 p-4 px-12 items-center gap-3 rounded-lg cursor-pointer  bg-gray-200 hover:shadow-xl`}
      >
        <Avatar className="h-14 w-14 bg-white">
          <img src={contact.image ? baseUrl + contact.image.url : ""} />
          <AvatarFallback>{contact.name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1 overflow-hidden">
          <div className="font-medium">{contact.name}</div>
          <div className="text-sm">{contact.email}</div>
        </div>
      </div>
      )) : (
        <div>
          No users found.
        </div>
      )}
    </div>
  );
};

export default AllUserContact;
