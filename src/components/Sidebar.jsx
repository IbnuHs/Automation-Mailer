import React, { useEffect, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { NavLink, useLocation } from "react-router";
import { useMsal } from "@azure/msal-react";
import { IoPerson, IoText } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import {
  MdEmail,
  MdKeyboardArrowDown,
  MdOutlineWarehouse,
} from "react-icons/md";
import { PiShippingContainerBold } from "react-icons/pi";

export const Sidebar = () => {
  const { accounts } = useMsal();
  const [onOpen, setOnOpen] = useState(false);
  const [onOpenTemp, setOnOpenTemp] = useState(false);
  const location = useLocation();
  const isBroadcastPages = location.pathname.startsWith("/broadcast");
  const isTemplatePages = location.pathname.startsWith("/template");

  useEffect(() => {
    if (!isBroadcastPages) {
      setOnOpen(false);
    }
    if (!isTemplatePages) {
      setOnOpenTemp(false);
    }
  }, [isBroadcastPages, isTemplatePages]);
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
        <ol className="[&>li]:text-white [&>li]:text-[18px] px-2 text-center flex gap-2 flex-col mt-3">
          <li className="rounded-md overflow-hidden">
            <button
              onClick={() => setOnOpen(!onOpen)}
              className={`py-3 hover:bg-[#5376DF] ${
                isBroadcastPages && !onOpen ? "bg-[#5376DF]" : ""
              } w-full flex items-center justify-center gap-2 font-semibold rounded`}>
              <HiOutlineSpeakerphone className="-rotate-[15deg]" /> Broadcast{" "}
              <MdKeyboardArrowDown className="text-[20px]" />
            </button>
            <div
              className={` ${
                onOpen ? "max-h-[500px]" : "overflow-hidden max-h-0"
              } flex-col transition-all flex gap-2 mt-1`}>
              <NavLink
                to={"/broadcast/oldstock"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF] flex items-center text-[16px] w-full font-semibold py-3 pl-16 gap-2 rounded`
                }>
                <MdOutlineWarehouse className="text-[20px]" />
                Old Stock
              </NavLink>
              <NavLink
                to={"/broadcast/intransit"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF] flex items-center text-[16px] w-full font-semibold py-3 pl-16 gap-2 rounded`
                }>
                <PiShippingContainerBold className="text-[20px]" />
                Intransit
              </NavLink>
            </div>
          </li>
          <li className=" overflow-hidden">
            <button
              onClick={() => setOnOpenTemp(!onOpenTemp)}
              className={`py-3 hover:bg-[#5376DF] ${
                isTemplatePages && !onOpenTemp ? "bg-[#5376DF]" : ""
              } rounded-md w-full flex items-center justify-center gap-2 font-semibold`}>
              <IoText className="" /> Template
              <MdKeyboardArrowDown className="text-[20px]" />
            </button>
            <div
              className={` ${
                onOpenTemp ? "max-h-[500px]" : "overflow-hidden max-h-0"
              } flex-col transition-all ease-linear mt-2`}>
              <NavLink
                to={"/template/oldstock"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF] flex items-center text-[16px] w-full font-semibold py-3 pl-16 gap-2 rounded`
                }>
                <MdOutlineWarehouse className="text-[20px]" />
                Old Stock
              </NavLink>
              <NavLink
                to={"/template/intransit"}
                className={({ isActive }) =>
                  ` ${
                    isActive ? "bg-[#5376DF]" : ""
                  } hover:bg-[#5376DF] flex items-center text-[16px] w-full font-semibold py-3 pl-16 gap-2 rounded`
                }>
                <PiShippingContainerBold className="text-[20px]" />
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
                } hover:bg-[#5376DF] w-full py-3 gap-2 flex rounded items-center  px-10 font-semibold`
              }>
              <MdEmail />
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
