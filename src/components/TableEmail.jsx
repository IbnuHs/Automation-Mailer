import React from "react";
import { Typography } from "@material-tailwind/react";
export const TableEmail = ({ data }) => {
  // console.log(data);
  return (
    <>
      <div className="font-kumbh-sans">
        <h6>Kode Dealer : {data.dealer}</h6>
        <h6>Nama Dealer : {data.nama_dealer}</h6>
      </div>
      <div className="">
        <table className="w-full min-w-max table-auto text-left whitespace-normal break-words">
          <thead>
            <tr>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70">
                  Email
                </Typography>
              </th>
              <th className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70">
                  Email Cc
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.email
              .toString()
              .split(",")
              .map((item, index) => (
                <tr key={index} className="border-b border-gray-500">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal text-wrap">
                      {item}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal">
                      {data.emailcc.toString().split(",")[index] ?? "-"}
                    </Typography>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
