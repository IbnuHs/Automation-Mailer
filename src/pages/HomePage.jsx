import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Outlet, Route, Routes } from "react-router";
import { Broadcast } from "./Broadcast";
import { Template } from "./Template";
import { Email } from "./Email";
import { Navbar } from "../components/Navbar";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <div className="px-12">
        <Navbar />
        <Routes>
          <Route path="/broadcast" element={<Broadcast />} />
          <Route path="/template" element={<Template />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </div>
    </div>
  );
};
