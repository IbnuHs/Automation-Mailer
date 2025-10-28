import React from "react";

export const CheckTemplate = ({ data }) => {
  const subject = localStorage.getItem("subject");
  const header = localStorage.getItem("header");
  const footer = localStorage.getItem("footer");
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
  <h4 style="text-align:center;margin:10px 0;font-family:Arial, sans-serif;">
    ${grouped[0]["Nama Dealer"]}
  </h4>
  <table border="1" cellspacing="0" cellpadding="4" 
    style="border-collapse:collapse;width:100%;font-family:Arial, sans-serif;font-size:13px;margin-bottom:15px;border:1px solid #000;">
    <thead style="background:#002060;color:white;text-align:left;">
      <tr>
        <th style="border:1px solid #000;">Nama Dealer</th>
        <th style="border:1px solid #000;">Nomes</th>
        <th style="border:1px solid #000;">Kode Type</th>
        <th style="border:1px solid #000;">Nama Type</th>
        <th style="border:1px solid #000;">Tahun Rakitan</th>
        <th style="border:1px solid #000;">Warna</th>
        <th style="border:1px solid #000;">Tanggal SSU</th>
      </tr>
    </thead>
    <tbody>
      ${grouped[0].data
        .map(
          row => `
          <tr>
            <td style="border:1px solid #000;">${row["Nama Dealer"] ?? "-"}</td>
            <td style="border:1px solid #000;">${row["Nomes"] ?? "-"}</td>
            <td style="border:1px solid #000;">${row["Kode Type"] ?? "-"}</td>
            <td style="border:1px solid #000;">${row["Nama Type"] ?? "-"}</td>
            <td style="border:1px solid #000;">${
              row["Tahun Rakitan"] ?? "-"
            }</td>
            <td style="border:1px solid #000;">${row["Warna"] ?? "-"}</td>
            <td style="border:1px solid #000;">${
              row["Tanggal SSU "] ?? row["Tanggal SSU"] ?? "-"
            }</td>
          </tr>
        `
        )
        .join("")}
    </tbody>
  </table>
`;

  return (
    <div className="font-kumbh-sans px-20 flex flex-col gap-3 overflow-y-auto py-8">
      {}
      <div className="flex gap-3">
        <h5 className="font-semibold">Subject : </h5>
        <p>{subject}</p>
      </div>
      <div className="">
        <h5 className="font-semibold">Email :</h5>
        <p className="whitespace-pre-line">{header}</p>
        <div className="" dangerouslySetInnerHTML={{ __html: htmlBody }}></div>
        <p className="whitespace-pre-line">{footer}</p>
      </div>
    </div>
  );
};
