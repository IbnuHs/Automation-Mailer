import { FaEye, FaEyeSlash } from "react-icons/fa";
import emailIcon from "../assets/email marketing and newsletter with new message.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

export const Auth = ({ setIsAuthenticated }) => {
  const [hide, setHide] = useState(false);
  const navigate = useNavigate();
  const onLogin = () => {
    setIsAuthenticated(true);
    navigate("/broadcast/oldstock");
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
      <div className="flex flex-col flex-1 border bg-base-white min-w-[480px] gap-10 items-center justify-center">
        <div className="text-center">
          <h2 className="font-semibold text-[24px]">SIGN UP</h2>
          <p className="text-base-gray font-semibold">
            Manage Your Client Email <br /> Much Easier
          </p>
        </div>
        <form
          action=""
          onSubmit={onLogin}
          className="w-full max-w-[60%] flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="font-semibold font-kumbh-sans">
              Username
            </label>
            <input
              type="text"
              className="border-2 border-gray-500 rounded focus:outline-none py-0.5 px-2"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold font-kumbh-sans">
              Password
            </label>
            <div className="border-2 border-gray-500 rounded overflow-hidden  flex">
              <input
                type={hide ? "text" : "password"}
                className="focus:outline-none py-0.5 px-2 flex-1"
              />
              <button
                className="text-black px-1"
                type="button"
                onClick={() => setHide(!hide)}>
                {hide ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <button
              type="submit"
              className="bg-base-blue text-white rounded-md px-4 py-1 font-semibold">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
