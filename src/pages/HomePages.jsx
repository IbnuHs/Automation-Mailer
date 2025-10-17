import React, { useState } from "react";
import * as XLSX from "xlsx";
import { useMsal } from "@azure/msal-react";
import { IoIosSend } from "react-icons/io";
import { ModalDealer } from "../modal/Modal";

export const HomePages = () => {
  const { instance, accounts } = useMsal();
  const [openModal, setOpenModal] = useState(true);
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const groupedByDealer = excelData.reduce((acc, item) => {
    const dealer = item["Nama Dealer"];
    if (!acc[dealer]) acc[dealer] = [];
    acc[dealer].push(item);
    return acc;
  }, {});
  const handleFileUpload = e => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = evt => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);
      setExcelData(jsonData);
    };
    reader.readAsBinaryString(file);
  };
  const emailDealer = localStorage.getItem("email");
  // Handle kirim email
  const sendEmail = async () => {
    if (excelData.length === 0) {
      alert("Upload file Excel dulu!");
      return;
    }

    try {
      const tokenResponse = await instance.acquireTokenSilent({
        scopes: ["Mail.Send"],
        account: accounts[0],
      });

      const accessToken = tokenResponse.accessToken;

      const email = {
        message: {
          subject: "Tes Kirim Email via Microsoft Graph API",
          body: {
            contentType: "Text",
            content: `Data Excel: \n${JSON.stringify(excelData, null, 2)}`,
          },
          toRecipients: [
            {
              emailAddress: {
                address: "example@gmail.com", // ganti dengan tujuan
              },
            },
          ],
        },
      };

      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/sendMail",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );

      if (response.ok) alert("Email berhasil dikirim!");
      else alert("Gagal kirim email");
    } catch (err) {
      console.error("Send email error:", err);
      alert("Error: " + err.message);
    }
  };
  function renderTable(data) {
    <table style="width:100%; border-collapse: collapse; margin-top: 10px; border: 1px solid #ccc; font-family: Arial, sans-serif; font-size: 14px;">
      <thead>
        <tr style="background-color: #f3f3f3;">
          <th style="border: 1px solid #ccc; padding: 6px; text-align: left;">
            Nomes
          </th>
          <th style="border: 1px solid #ccc; padding: 6px; text-align: left;">
            Kode Type
          </th>
          <th style="border: 1px solid #ccc; padding: 6px; text-align: left;">
            Nama Type
          </th>
          <th style="border: 1px solid #ccc; padding: 6px; text-align: left;">
            Tahun Rakitan
          </th>
          <th style="border: 1px solid #ccc; padding: 6px; text-align: left;">
            Tanggal SSU
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => {
          <tr>
            <td style="border: 1px solid #ccc; padding: 6px;">{item.Nomes}</td>
            <td style="border: 1px solid #ccc; padding: 6px;">
              {item.kode_type}
            </td>
            <td style="border: 1px solid #ccc; padding: 6px;">
              {item.nama_type}
            </td>
            <td style="border: 1px solid #ccc; padding: 6px;">
              {item.tahun_rakitan}
            </td>
            <td style="border: 1px solid #ccc; padding: 6px;">
              {item.tgl_ssu}
            </td>
          </tr>;
        })}
      </tbody>
    </table>;
  }
  return (
    <div className="px-24 space-y-6 w-full">
      <div className="">
        <table className="min-w-full table-auto mt-5 border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">Dealer</th>
              <th className="border px-2 py-1">Email To</th>
              <th className="border px-2 py-1">Email CC</th>
            </tr>
          </thead>
          <tbody>
            {/* {emailDealer.length > 0 &&
              JSON.parse(emailDealer).map(item => (
                <tr>
                  <td className="border px-2 py-1">{item.dealer}</td>
                  <td className="border px-2 py-1">{item.email}</td>
                  <td className="border px-2 py-1">{item.emailBcc}</td>
                </tr>
              ))} */}
          </tbody>
        </table>
        <div className="flex justify-end py-2">
          <ModalDealer openModal={openModal} setOpenModal={setOpenModal} />
        </div>
      </div>
      <div className="border p-4 rounded shadow w-full">
        <h2 className="text-lg font-semibold mb-2 text-center">
          Upload File Excel
        </h2>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="border w-full text-center py-5 cursor-pointer hover:bg-gray-200 rounded-md"
        />
        {fileName && <p className="mt-2 font-semibold">File: {fileName}</p>}
      </div>

      <div className="">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold mb-5">Data Excel</h2>
          <button className="mt-3 ml-0 flex gap-1 font-semibold">
            Send All <IoIosSend className="text-[20px]" />
          </button>
        </div>
        {excelData.length === 0 ? (
          <p>Belum ada data.</p>
        ) : (
          <div className="space-y-2 flex flex-col">
            {Object.entries(groupedByDealer).map(([dealer, motors], index) => (
              <div className="shadow p-5">
                <h1 className="font-semibold text-xl text-black text-center">
                  {dealer}
                </h1>
                <table className="min-w-full table-auto mt-5 border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border px-2 py-1">Nomes</th>
                      <th className="border px-2 py-1">Kode Type</th>
                      <th className="border px-2 py-1">Nama Type</th>
                      <th className="border px-2 py-1">Tahun Rakitan</th>
                      <th className="border px-2 py-1">Tanggal SSU</th>
                    </tr>
                  </thead>
                  <tbody>
                    {motors.map((motor, idx) => (
                      <tr key={idx}>
                        <td className="border px-2 py-1">{motor["Nomes"]}</td>
                        <td className="border px-2 py-1">
                          {motor["Kode Type"]}
                        </td>
                        <td className="border px-2 py-1">
                          {motor["Nama Type"]}
                        </td>
                        <td className="border px-2 py-1">
                          {motor["Tahun Rakitan"]}
                        </td>
                        <td className="border px-2 py-1">
                          {motor["Tanggal SSU"]}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end">
                  <button className="mt-3 ml-0 flex gap-1">
                    Send <IoIosSend className="text-[20px]" />
                  </button>
                </div>
              </div>
            ))}
            {/* <Accordion alwaysOpen={false}>
            </Accordion> */}
          </div>
        )}
      </div>
      {/* <div className="flex justify-end">
        <button
          onClick={sendEmail}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Kirim Email
        </button>
      </div> */}
    </div>
  );
};
