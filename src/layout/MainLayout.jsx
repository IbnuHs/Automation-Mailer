import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router";

export const MainLayout = () => {
  return (
    <div>
      <div className="min-h-screen flex">
        <Sidebar />
        <div className="">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
