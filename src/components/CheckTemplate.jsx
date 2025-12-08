import React from "react";

export const CheckTemplate = ({ data }) => {
  const subject = localStorage.getItem("subject");
  const template = localStorage.getItem("template");
  const grouped = Object.values(
    data?.reduce((acc, item) => {
      const kode = item["Kode Dealer"];
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
  const htmlBody = `
  <table border="1" cellspacing="0" cellpadding="4" 
    style="border-collapse:collapse;width:100%;font-family:Arial, sans-serif;font-size:13px;margin:15px 0;border:1px solid #000;">
    <thead style="background:#002060;color:white;text-align:left;">
      <tr>
        ${Object.keys(data[0])
          .filter(key => key !== "Kode Dealer")
          .map(i => `<th style="border:1px solid #000;">${i}</th>`)
          .join("")}
      </tr>
    </thead>
    <tbody>
      ${grouped[0].data
        .map(
          row => `
          <tr>
            ${Object.keys(row)
              .filter(key => key.toLocaleLowerCase() !== "kode dealer")
              .map(
                (key, j) =>
                  ` <td style="border:1px solid #000;">${row[key] ?? "-"}</td>
              `
              )
              .join("")}
          </tr>
        `
        )
        .join("")}
    </tbody>
  </table>
`;
  const replaceVariable = (variable = {}) => {
    const res = JSON.parse(template).replace(/{{(.*?)}}/g, (_, key) => {
      return variable[key.trim()] ?? "-";
    });
    return res;
  };
  const bodyEmail = replaceVariable({ table: htmlBody });
  return (
    <div className="font-kumbh-sans px-20 flex flex-col gap-3 overflow-y-auto py-8">
      {}
      <div className="flex gap-3">
        <h5 className="font-semibold">Subject : </h5>
        <p>{subject}</p>
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
