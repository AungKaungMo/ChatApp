import { LogOut, MessageCircle, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useLoginStore } from "@/store/auth.store";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProfileUpload from "@/components/profile-upload";
import { useLogoutUser } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useUpdateProfile } from "@/hooks/useProfile";

const ChatNavbar = () => {
  const { user, clearUser, setUser } = useLoginStore();
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast();
  const { data, mutate: logoutUser } = useLogoutUser();
  const baseUrl = import.meta.env.VITE_APP_BASE_IMAGE_URL;
  const [updatedName, setUpdatedName] = useState(user?.name || ""); // Manage the updated name
  const { mutate: updateProfile } = useUpdateProfile();
  useEffect(() => {
    if (data?.status) {
      toast({
        title: "Logout",
        description: "You have been logged out.",
        variant: "success",
        duration: 3000,
      });
      clearUser();
    }
  }, [data]);

  const handleProfileUpdate = async () => {

      if (user) {
        await updateProfile({ name: updatedName, id: user?._id }, {
          onSuccess: (data) => {
            toast({
              title: "Profile Updated",
              description: "Your profile has been updated.",
              variant: "success",
              duration: 1500
            });
            if (data.status && user && user._id && user.name && user.email) {
              setUser({
                ...user,
                name: updatedName,
                imageUrl: user.imageUrl || "",
              });
              setIsOpen(false)
            }
          },
          onError: () => {
            toast({
              title: "Error",
              description: "There was an error updating your profile.",
              variant: "destructive",
            });
          }
        });
      }
   
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white ">
      <div className=" px-4 flex h-[4.5em] items-center">
        <div className="flex items-center gap-2 font-semibold">
          <MessageCircle className="h-5 w-5 text-primary" />
          <span>Chat With Me</span>
        </div>

        <nav className="flex flex-1 items-center justify-center gap-6">
          <Link
            to="/chat"
            className={`relative text-sm font-bold transition-colors
              ${
                !useLocation()?.pathname?.includes("chat")
                  ? " text-muted-foreground hover:text-primary"
                  : ""
              }
              `}
          >
            <span>Conversations</span>
            {useLocation()?.pathname?.includes("chat") && (
              <span className="absolute -bottom-7 left-0 right-0 h-[2px] bg-primary" />
            )}
          </Link>

          <Link
            to="/contacts"
            className={`text-sm relative font-bold transition-colors 
              ${
                !useLocation()?.pathname?.includes("contacts")
                  ? " text-muted-foreground hover:text-primary"
                  : ""
              }
              `}
          >
            <span>Contacts</span>
            {useLocation()?.pathname?.includes("contacts") && (
              <span className="absolute -bottom-7 left-0 right-0 h-[2px] bg-primary" />
            )}
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </Button> */}
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarImage
                  src={user?.imageUrl ? baseUrl + user.imageUrl : ""}
                  alt="Profile"
                />
                <AvatarFallback>{user?.name[0] || "A"}</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-56" align="end">
              <div className="grid gap-4 font-serif">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="ghost"
                        className="w-full  justify-start gap-2"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] font-serif">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <ProfileUpload
                          propsAvatar={
                            user?.imageUrl ? baseUrl + user?.imageUrl : ""
                          }
                        />
                        <div className="flex flex-col  gap-4">
                          <Label htmlFor="name" className="font-semibold">
                            Name
                          </Label>
                          <Input
                            id="name"
                            value={updatedName}
                            className="col-span-3"
                            onChange={(e) => setUpdatedName(e.target.value)}
                          />
                        </div>

                        <div className="flex flex-col  gap-4">
                          <Label htmlFor="email" className="font-semibold">
                            Email
                          </Label>
                          {/* <input type="email" value={user?.email} /> */}
                          <Input
                            id="email"
                            readOnly
                            defaultValue={user?.email}
                            className="col-span-3 cursor-not-allowed select-none"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit" onClick={handleProfileUpdate}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2"
                    onClick={() => logoutUser()}
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default ChatNavbar;
