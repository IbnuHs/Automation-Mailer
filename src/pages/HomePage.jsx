import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Route, Routes } from "react-router";
import { Template } from "./Template";
import { Email } from "./Email";
import { Navbar } from "../components/Navbar";
import { BroadCast } from "./Broadcast";
import { BroadCastIntransit } from "./Broadcastintarnsit";

export const HomePage = () => {
  return (
    <div className="h-screen w-screen flex flex-1 min-h-0">
      <Sidebar />
      <div className="flex flex-col flex-1 min-h-0">
        <Navbar />
        <div className="flex-1 flex min-h-0">
          <Routes>
            <Route path="/broadcast/oldstock" element={<BroadCast />} />
            <Route
              path="/broadcast/intransit"
              element={<BroadCastIntransit />}
            />
            <Route
              path="/template/oldstock"
              element={
                <Template
                  title={"Old Stock"}
                  subjectname={"subject"}
                  templatename={"template"}
                />
              }
            />
            <Route
              path="/template/intransit"
              element={
                <Template
                  title={"Intransit"}
                  subjectname={"subjectIntransit"}
                  templatename={"templateIntransit"}
                />
              }
            />
            <Route path="/email" element={<Email />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
