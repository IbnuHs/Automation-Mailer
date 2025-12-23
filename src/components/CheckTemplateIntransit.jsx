import React from "react";
import { intransitTable } from "../utils/intransitTable";

export const CheckTemplateIntransit = ({ data }) => {
  const subject = localStorage.getItem("subject");
  const template = localStorage.getItem("templateIntransit");
  const grouped = Object.values(
    data?.reduce((acc, item) => {
      const kode = item["KODE DEALER"];
      const namaDealer = item["Nama Dealer"];
      if (!acc[kode]) {
        acc[kode] = {
          kode: kode,
          "Nama Dealer": namaDealer,
          data: [],
        };
      }
      acc[kode].data.push(item);
      return acc;
    }, {})
  );
  const htmlBody = intransitTable(grouped[3].data);
  const replaceVariable = (variable = {}) => {
    const res = JSON.parse(template)?.replace(/{{(.*?)}}/g, (_, key) => {
      return variable[key.trim()] ?? "-";
    });
    return res;
  };
  const bodyEmail = replaceVariable({
    table: htmlBody,
    dealer: grouped[3]["Nama Dealer"],
  });
  return (
    <div className="font-kumbh-sans px-20 flex flex-col overflow-y-auto py-8 ">
      <div className="flex gap-3">
        <h5 className="font-semibold">Subject : </h5>
        <p>{subject ? JSON.parse(subject) : ""}</p>
      </div>
      <div className="">
        <h5 className="font-semibold">Email :</h5>
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: bodyEmail }}></div>
      </div>
    </div>
  );
};
