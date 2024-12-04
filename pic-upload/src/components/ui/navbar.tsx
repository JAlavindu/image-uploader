// src/components/ui/navbar.tsx
"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { clearUser } from "@/redux/slices/authSlice";
import { supabase } from "@/lib/supabaseClient";
import { Button } from "@/components/ui/button";

const Navbar: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      dispatch(clearUser());
    } else {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <div>
        <Link href="/" className="mr-4">
          Home
        </Link>
        {user && (
          <Link href="/dashboard" className="mr-4">
            Dashboard
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Link href="/auth">
            <Button variant="ghost">Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
