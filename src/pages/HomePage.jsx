import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Route, Routes } from "react-router";
import { Template } from "./Template";
import { Email } from "./Email";
import { Navbar } from "../components/Navbar";
import { BroadCast } from "./Broadcast";

export const HomePage = () => {
  return (
    <div className="h-screen flex flex-1 min-h-0">
      <Sidebar />
      <div className="px-12 flex flex-col flex-1 min-h-0">
        <Navbar />
        <div className="flex-1 flex min-h-0">
          <Routes>
            <Route path="/" element={<BroadCast />} />
            <Route path="/template" element={<Template />} />
            <Route path="/email" element={<Email />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
