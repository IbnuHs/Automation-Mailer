import React from "react";
import { IoMdMail } from "react-icons/io";
import { Link, NavLink } from "react-router";
import { useMsal } from "@azure/msal-react";
import { IoPerson } from "react-icons/io5";

export const Sidebar = () => {
  const { accounts } = useMsal();
  console.log(accounts);
  return (
    <div className="w-full max-w-[200px] bg-base-blue flex flex-col h-screen font-kumbh-sans">
      <div className="py-10 px-5 border-b ">
        <div className=" flex font-kumbh-sans justify-center items-center gap-3">
          <IoMdMail className="text-white text-[24px]" />
          <h3 className="font-semibold text-[20px] text-white text-center">
            Mailer
          </h3>
        </div>
      </div>
      <div className="flex justify-between flex-col flex-1">
        <ol className="[&>li]:text-white [&>li]:text-[18px] text-center flex flex-col mt-3">
          <li>
            <NavLink
              to={"/broadcast"}
              className={({ isActive }) =>
                ` ${
                  isActive ? "bg-[#5376DF]" : ""
                } hover:bg-[#5376DF] w-full inline-block py-3`
              }>
              Broadcast
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/template"}
              className={({ isActive }) =>
                ` ${
                  isActive ? "bg-[#5376DF]" : ""
                } hover:bg-[#5376DF] w-full inline-block py-3`
              }>
              Template
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/email"}
              className={({ isActive }) =>
                ` ${
                  isActive ? "bg-[#5376DF]" : ""
                } hover:bg-[#5376DF] w-full inline-block py-3`
              }>
              Email
            </NavLink>
          </li>
        </ol>
        <div className="flex  gap-2 items-center px-4 py-5">
          <div className="p-1 border rounded-full border-white">
            <IoPerson className="text-[20px] text-base-white" />
          </div>
          <h3 className="font-semibold text-base-white capitalize text-[16px]">
            {accounts[0].name}
          </h3>
        </div>
      </div>
    </div>
  );
};
