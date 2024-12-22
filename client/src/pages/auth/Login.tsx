import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormValues } from "@/schema/auth.schema";
import { useLoginUser } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast"
import { IUser, useLoginStore } from "@/store/auth.store";

const Login = () => {
  const { mutate: loginMutate, isPending: loginLoading } = useLoginUser();
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutate(data, {
      onSuccess: (userData) => {
        // if(userData.data) {
        useLoginStore.getState().setUser(userData.data as IUser);
        toast({
          variant: "success",
          title: "Success",
          duration: 1500,
          description: "Login Successfully."
        })
      // }
      },
      onError: (error: any) => {
        toast({
          variant: 'destructive',
          duration: 1500,
          title: "Error",
          description: error?.error || "Login failed."
        })
      }
    });
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="text"
          placeholder="m@example.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-sm text-red-500">{errors.email.message}</span>
        )}
      </div>
      <div className="space-y-2 mt-3">
        <Label htmlFor="password">Password</Label>
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              id="password"
              type="password"
              className="pl-10"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>
      </div>
      <Button
        className="w-full space-y-2 mt-6"
        type="submit"
        loading={loginLoading}
      >
        Login
      </Button>
    </form>
  );
};

export default Login;
