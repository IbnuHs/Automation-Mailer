import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Route, Routes } from "react-router";
import { Template } from "./Template";
import { Email } from "./Email";
import { Navbar } from "../components/Navbar";
import { BroadCast } from "./Broadcast";

export const HomePage = () => {
  return (
    <div className="h-screen max-h-screen overflow-hidden flex">
      <Sidebar />
      <div className="px-12 h-full flex flex-col  flex-1">
        <Navbar />
        <Routes>
          <Route path="/broadcast" element={<BroadCast />} />
          <Route path="/template" element={<Template />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </div>
    </div>
  );
};
