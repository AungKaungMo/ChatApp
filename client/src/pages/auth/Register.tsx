import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormValues } from "@/schema/auth.schema";
import { useRegisterUser } from "@/hooks/useAuth";
import { useLoginStore } from "@/store/auth.store";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const { mutate: registerMutate, isPending: registerLoading } = useRegisterUser();
  const {toast} = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormValues) => {
    registerMutate(data, {
      onSuccess: (userData) => {
        useLoginStore.setState({ user: userData.data });
        toast({
          variant: "success",
          title: "Success",
          duration: 1500,
          description: "Register Successfully."
        })
      },
      onError: (error: any) => {
        toast({
          variant: 'destructive',
          duration: 1500,
          title: "Error",
          description: error?.error || "Register failed."
        })
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
        {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
      </div>
      <div className="space-y-2 mt-3">
        <Label htmlFor="name">Username</Label>
        <Input id="name" placeholder="johndoe" {...register("name")} />
        {errors.name && <span className="text-sm text-red-500">{errors.name.message}</span>}
      </div>
      <div className="space-y-2 mt-3">
        <Label htmlFor="password">Password</Label>
        <div>
          <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input id="password" type="password" className="pl-10" {...register('password')} />
          </div>
          {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
        </div>
      </div>
      <div className="space-y-2 mt-3">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <div >
          <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            id="confirm-password"
            type="password"
            className="pl-10"
            {...register("confirm_password")}
          />
          </div>
            {errors.confirm_password && <span className="text-sm text-red-500">{errors.confirm_password.message}</span>}
        </div>
      </div>
      <Button className="w-full mt-6 space-y-2" type="submit" loading={registerLoading}>Create Account</Button>
    </form>
  );
};

export default Register;
