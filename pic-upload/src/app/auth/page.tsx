// src/app/auth/page.tsx
"use client";

import React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { signInWithEmail, signUpWithEmail } from "@/redux/slices/authSlice";
import AuthForm from "@/components/AuthForm";

const AuthPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSignIn = async (email: string, password: string) => {
    try {
      await dispatch(signInWithEmail({ email, password })).unwrap();
      // Redirect handled by AuthForm's useEffect
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      await dispatch(signUpWithEmail({ email, password })).unwrap();
      // Redirect handled by AuthForm's useEffect
    } catch (error) {
      console.error("Sign Up Error:", error);
    }
  };

  return (
    <AuthForm
      onSignIn={handleSignIn}
      onSignUp={handleSignUp}
      title="Welcome! Sign In or Register"
    />
  );
};

export default AuthPage;
