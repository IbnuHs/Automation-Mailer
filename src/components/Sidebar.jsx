import React from "react";
import { Link } from "react-router";

export const Sidebar = () => {
  return (
    <div className="min-w-[230px] bg-base-blue">
      <div className="p-16 border-b">
        <h3 className="font-bold text-[24px] text-white text-center">Mailer</h3>
      </div>
      <ol className="[&>li]:text-white [&>li]:text-[18px] text-center flex flex-col mt-3 ">
        <li>
          <Link
            to={"/broadcast"}
            className="hover:bg-[#5376DF] w-full inline-block py-3">
            Broadcast
          </Link>
        </li>
        <li>
          <Link
            to={"/template"}
            className="hover:bg-[#5376DF] w-full inline-block py-3">
            Template
          </Link>
        </li>
        <li>
          <Link
            to={"/email"}
            className="hover:bg-[#5376DF] w-full inline-block py-3">
            Email
          </Link>
        </li>
      </ol>
    </div>
  );
};
