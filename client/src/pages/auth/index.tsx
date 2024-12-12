import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { Label } from "@/components/ui/label";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle size={40} className="text-blue-500" />
          </div>
          <CardTitle className="text-2xl text-center">
            {isLogin ? "Welcome back!" : "Create an account"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin ? "Login to access your account" : "Sign up to get started"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Label htmlFor="mode-toggle" className={isLogin ? "text-muted-foreground" : "text-primary"}>
              Register
            </Label>
            <Switch
              id="mode-toggle"
              checked={isLogin}
              onCheckedChange={() => setIsLogin(!isLogin)}
            />
            <Label htmlFor="mode-toggle" className={isLogin ? "text-primary" : "text-muted-foreground"}>
              Login
            </Label>
          </div>
          {isLogin ? <Login /> : <Register />}
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-muted-foreground w-full">
            {isLogin ? (
              <Link
                to="/"
                className="underline underline-offset-4 hover:text-primary"
              >
                Forgot your password?
              </Link>
            ) : (
              "By signing up, you agree to our Terms of Service and Privacy Policy"
            )}
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
