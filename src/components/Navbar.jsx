import { useMsal } from "@azure/msal-react";
import React from "react";

export const Navbar = () => {
  const { instance } = useMsal();
  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:5173/",
    });
  };
  return (
    <div className="flex justify-end py-3">
      <button
        type="button"
        onClick={logout}
        className="font-kumbh-sans border border-transparent transition-all px-4 py-1 rounded-md hover:border-gray-500">
        Log Out
      </button>
    </div>
  );
};
