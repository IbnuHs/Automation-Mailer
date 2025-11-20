import { useMsal } from "@azure/msal-react";
import React from "react";

export const Navbar = () => {
  const { instance } = useMsal();
  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173/",
      // postLogoutRedirectUri: "https://automation-mailer.vercel.app",
    });
  };
  return (
    <div className="flex justify-end py-3">
      <button
        type="button"
        onClick={logout}
        className="font-kumbh-sans border  transition-all px-4 py-0.5 text-[14px] border-gray-400 rounded-md hover:border-gray-500">
        Log Out
      </button>
    </div>
  );
};
