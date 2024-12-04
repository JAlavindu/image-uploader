"use client";

import ProtectedRoute from "@/components/protectedRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const DashboardPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
        <p className="mt-4 text-gray-700">Email: {user?.email}</p>
        {/* Add more dashboard content here */}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;
