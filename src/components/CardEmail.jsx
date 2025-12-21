import React from "react";
import { FaWarehouse } from "react-icons/fa";

export const CardEmail = props => {
  console.log(props.data);
  return (
    <div className="border-[3px] border-gray-300 p-4 rounded font-kumbh-sans flex flex-col gap-5 float-start">
      <div className="flex gap-2 items-center ">
        <div className="flex items-center gap-2">
          <FaWarehouse className="text-blue-400 text-[20px]" />
          <h5 className="font-semibold">{props.data.nama_dealer}</h5>
        </div>
        <p className="bg-blue-500 text-white py-0.5 px-2 rounded-md">
          {props.data.dealer}
        </p>
      </div>
      <div className="flex gap-2">
        <table>
          <tr>
            <td className="align-top">
              <h4 className="font-semibold text-[13px] text-start pr-8">
                Email
              </h4>
            </td>
            <div className="flex gap-2 box-content flex-wrap">
              {props.data.email
                .toString()
                .split(",")
                .map(item => (
                  <p className="float-start h-fit bg-gray-200 py-0.5 px-2 rounded text-gray-800 text-[12px]">
                    {item}
                  </p>
                ))}
            </div>
          </tr>
        </table>
      </div>

      <div className="flex gap-2">
        <table>
          <tr>
            <td className="align-top">
              <h4 className="font-semibold text-[13px] pr-2">Email CC</h4>
            </td>
            <div className="flex gap-2 box-content flex-wrap">
              {props.data.emailcc
                .toString()
                .split(",")
                .map(item => (
                  <p className="float-start h-fit bg-gray-200 py-0.5 px-2 rounded text-gray-800 text-[12px]">
                    {item}
                  </p>
                ))}
            </div>
          </tr>
        </table>
      </div>
    </div>
  );
};
