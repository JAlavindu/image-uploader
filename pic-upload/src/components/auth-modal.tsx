"use client";

import { useState, useRef } from "react";
import Image from "next/image";
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
import { UploadIcon, UserCircle2 } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [step, setStep] = useState<"auth" | "profile-upload">("auth");
  const [isLogin, setIsLogin] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpload = () => {
    // Here you would typically upload the file to your backend
    // For now, we'll just simulate a successful upload
    console.log("Profile picture uploaded:", selectedFile);
    onClose(); // Close modal after upload
  };

  const renderProfileUpload = () => (
    <Card className="w-[90vw] max-w-[400px]">
      <CardHeader>
        <CardTitle>Upload Profile Picture</CardTitle>
        <CardDescription>
          Add a profile picture to personalize your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 flex flex-col items-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          className="hidden"
        />
        <div
          className="w-48 h-48 border-2 border-dashed rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary/20 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Image
            src={previewUrl || "/default-profile.png"}
            alt="Profile preview"
            className="w-full h-full object-cover rounded-full"
            fill
          />
          : (
          <div className="flex flex-col items-center text-muted-foreground">
            <UserCircle2 size={64} />
            <span className="mt-2 text-sm">Click to upload</span>
          </div>
          )
        </div>

        {selectedFile ? (
          <div className="mt-4 flex items-center space-x-2">
            <UploadIcon size={20} />
            <span className="text-sm">{selectedFile.name}</span>
          </div>
        ) : null}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full"
          onClick={handleProfileUpload}
          disabled={!selectedFile}
        >
          Upload Profile Picture
        </Button>
        <motion.button
          onClick={() => setStep("auth")}
          className="text-sm text-muted-foreground hover:text-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Skip for now
        </motion.button>
      </CardFooter>
    </Card>
  );

  const renderAuthForm = () => (
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
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => setStep("profile-upload")}
          >
            <Icons.google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={() => setStep("profile-upload")}
          >
            <Icons.gitHub className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
        </div>
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
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button
          className="w-full"
          type="submit"
          onClick={() => setStep("profile-upload")}
        >
          {isLogin ? "Sign in" : "Sign up"}
        </Button>
        <motion.button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-muted-foreground hover:text-primary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isLogin
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </motion.button>
      </CardFooter>
    </Card>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                {step === "auth" ? renderAuthForm() : renderProfileUpload()}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
