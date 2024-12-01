"use client";

import { useState, useEffect } from "react";
import { AppDispatch } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import {
  signIn,
  signUp,
  signInWithGoogle,
  signInWithGitHub,
} from "@/store/authSlice"; // Import actions from Redux auth slice
import { RootState } from "@/store/store";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  // Access authentication state from Redux
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  // Close modal if user is authenticated
  useEffect(() => {
    if (user) {
      onClose();
    }
  }, [user, onClose]);

  // Handle modal close on 'Escape' key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Handle sign-in or sign-up form submission
  const handleAuth = () => {
    if (isLogin) {
      dispatch(signIn({ email, password }));
    } else {
      dispatch(signUp({ email, password }));
    }
  };

  // Handle Google authentication
  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  // Handle GitHub authentication
  const handleGitHubSignIn = () => {
    dispatch(signInWithGitHub());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <Card className="w-[90vw] max-w-[400px]">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>
                      {isLogin ? "Welcome back" : "Create an account"}
                    </CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={onClose}
                    >
                      <Icons.close className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardDescription>
                    {isLogin
                      ? "Enter your credentials to sign in"
                      : "Sign up to start sharing your images"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Third-party authentication options */}
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGoogleSignIn}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Loading...</span>
                      ) : (
                        <>
                          <Icons.google className="mr-2 h-4 w-4" />
                          Continue with Google
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleGitHubSignIn}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Loading...</span>
                      ) : (
                        <>
                          <Icons.gitHub className="mr-2 h-4 w-4" />
                          Continue with GitHub
                        </>
                      )}
                    </Button>
                  </div>
                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-background px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  {/* Email/Password Form */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  {/* Show error message if there's an error */}
                  {error && (
                    <p className="text-red-500 text-sm">
                      {error ||
                        "An unexpected error occurred. Please try again."}
                    </p>
                  )}
                </CardContent>
                <CardFooter className="flex flex-col space-y-2">
                  <Button
                    className="w-full"
                    type="submit"
                    onClick={handleAuth}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : isLogin ? "Sign in" : "Sign up"}
                  </Button>
                  {/* Toggle between sign-in and sign-up */}
                  <motion.button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-sm text-muted-foreground hover:text-primary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {isLogin
                      ? "Don't have an account? Sign up"
                      : "Already have an account? Sign in"}
                  </motion.button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
