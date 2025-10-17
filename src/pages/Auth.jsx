import { FaMicrosoft } from "react-icons/fa6";
import { useMsal } from "@azure/msal-react";
import emailIcon from "../assets/email marketing and newsletter with new message.svg";
import { IconButton } from "@material-tailwind/react";

export const Auth = () => {
  const { instance, accounts } = useMsal();
  const handleLogin = async () => {
    try {
      await instance.loginPopup({ scopes: ["Mail.Send"] });
      console.log("login Berhasil");
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  return (
    <div className="m-auto min-w-[300px] shadow-md items-stretch justify-center border flex flex-row h-fit">
      <div className="flex flex-col gap-[10px] px-8 h-fit py-24 items-center bg-base-blue justify-center">
        <h3 className="text-[24px] font-semibold text-base-white">
          Send Email To Your All Client
        </h3>
        <img
          src={emailIcon}
          alt="phone with email icon"
          className="max-w-[300px] h-fit"
        />
        <h3 className="text-[24px] font-semibold text-base-white">
          Just One Click
        </h3>
      </div>
      <div className="flex flex-col flex-1 bg-base-white min-w-[480px] gap-28 items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-[24px]">SIGN UP</h2>
          <p className="text-base-gray font-semibold">
            Manage Your Client Email <br /> Much Easier
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogin}
          className="flex items-center w-fit bg-base-blue text-white justify-center gap-2 shadow px-16 py-1 text-sm rounded-sm font-semibold ">
          <FaMicrosoft className="" /> Login With Microsoft
        </button>
      </div>
    </div>
  );
};
