import React, { useState } from "react";
import { IoMdMail } from "react-icons/io";
import { NavLink } from "react-router";
import { useMsal } from "@azure/msal-react";
import { IoPerson } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiTextAlignCenter } from "react-icons/ci";

export const Sidebar = () => {
  const { accounts } = useMsal();
  const [onOpen, setOnOpen] = useState(false);
  const [onOpenTemp, setOnOpenTemp] = useState(false);
  return (
    <div className="w-full max-w-[230px] bg-base-blue flex flex-col h-screen font-kumbh-sans">
      <div className="py-10 px-5 border-b ">
        <div className=" flex font-kumbh-sans justify-center items-center gap-3">
          <IoMdMail className="text-white text-[24px]" />
          <h3 className="font-semibold text-[20px] text-white text-center">
            Mailer
          </h3>
        </div>
      </div>
      <div className="flex justify-between flex-col flex-1">
        <ol className="[&>li]:text-white [&>li]:text-[18px] text-center flex gap-2 flex-col mt-3">
          <li className="bg-blue-gray-400 mx-2 rounded-md overflow-hidden">
            <button
              onClick={() => setOnOpen(!onOpen)}
              className="py-3 hover:bg-[#5376DF] w-full flex items-center justify-center gap-2 font-semibold">
              <HiOutlineSpeakerphone className="-rotate-[15deg]" /> Broadcast{" "}
              <MdKeyboardArrowDown className="text-[20px]" />
            </button>
            <div
              className={` ${
                onOpen ? "max-h-[500px]" : "overflow-hidden max-h-0"
              } flex-col transition-all`}>
              <NavLink
                to={"/broadcast/oldstock"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF]  text-[16px] pl-5 w-full inline-block py-3`
                }>
                Old Stock
              </NavLink>
              <NavLink
                to={"/broadcast/intransit"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF]  text-[16px] pl-5 w-full inline-block py-3`
                }>
                Intransit
              </NavLink>
            </div>
          </li>
          <li className="bg-blue-gray-400 mx-2 rounded-md overflow-hidden">
            <button
              onClick={() => setOnOpenTemp(!onOpenTemp)}
              className="py-3 hover:bg-[#5376DF] w-full flex items-center justify-center gap-2 font-semibold">
              <CiTextAlignCenter className="-rotate-[15deg]" /> Template{" "}
              <MdKeyboardArrowDown className="text-[20px]" />
            </button>
            <div
              className={` ${
                onOpenTemp ? "max-h-[500px]" : "overflow-hidden max-h-0"
              } flex-col transition-all ease-linear `}>
              <NavLink
                to={"/template/oldstock"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF] w-full inline-block py-3`
                }>
                Old Stock
              </NavLink>
              <NavLink
                to={"/template/intransit"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF]  text-[16px] pl-5 w-full inline-block py-3`
                }>
                Intransit
              </NavLink>
            </div>
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
