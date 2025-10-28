import React from "react";
import { Link, NavLink } from "react-router";

export const Sidebar = () => {
  return (
    <div className=" max-w-[200px] bg-base-blue font-kumbh-sans">
      <div className="p-16 border-b">
        <h3 className="font-bold text-[24px] text-white text-center">Mailer</h3>
      </div>
      <ol className="[&>li]:text-white [&>li]:text-[18px] text-center flex flex-col mt-3 ">
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
    </div>
  );
};
