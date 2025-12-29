import { useMsal } from "@azure/msal-react";
import React from "react";
import { useNavigate } from "react-router";

export const Navbar = () => {
  // const { instance } = useMsal();
  const navigate = useNavigate();
  const logout = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-end py-3 bg-white  px-4">
      <button
        type="button"
        onClick={logout}
        className="font-kumbh-sans border  transition-all px-4 py-0.5 text-[14px] border-gray-400 rounded-md hover:border-gray-500">
        Log Out
      </button>
    </div>
  );
};
