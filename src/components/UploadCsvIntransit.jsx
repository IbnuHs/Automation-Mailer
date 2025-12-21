import React, { useEffect, useRef, useState } from "react";
import bgfile from "../assets/Email marketing and newsletter content.png";
import * as xlsx from "xlsx";
import Swal from "sweetalert2";

export const UploadCSVIntransit = ({ data, setData, setActiveStep }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  function excelDateToJSDate(serial) {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(excelEpoch.getTime() + serial * 86400000);

    const day = String(jsDate.getUTCDate()).padStart(2, "0");
    const month = String(jsDate.getUTCMonth() + 1).padStart(2, "0");
    const year = jsDate.getUTCFullYear();

    return `${day}-${month}-${year}`;
  }
  useEffect(() => {
    let reader = new FileReader();
    if (!file) return;
    setLoading(true);
    Swal.fire({
      title: "Loading",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    reader.onload = evt => {
      const bstr = evt.target.result;
      const workbook = xlsx.read(bstr, { type: "array" });
      const worksheetname = workbook.SheetNames[0];
      const worksheets = workbook.Sheets[worksheetname];
      const jsonData = xlsx.utils.sheet_to_json(worksheets, {
        defval: "",
        blankrows: true,
      });
      jsonData.map(item => {
        item.ATA = item.ATA ? excelDateToJSDate(item.ATA) : "-";
        item.ETA = item.ETA ? excelDateToJSDate(item.ETA) : "-";
      });

      setData(jsonData);
      setLoading(false);
    };
    reader.readAsArrayBuffer(file);
  }, [file]);
  useEffect(() => {
    if (data) {
      Swal.close();
    }
  }, [data]);
  const clear = () => {
    setFile(null);
    setData(null);
  };
  return (
    <div className="font-kumbh-sans flex flex-col min-h-0 h-full flex-1 overflow-scroll relative px-8">
      {data ? (
        <div className="font-kumbh-sans flex flex-col flex-1 min-h-0">
          <table className="w-full table-fixed text-left whitespace-normal break-words">
            <thead className="bg-blue-gray-50 z-10">
              <tr>
                {Object.keys(data[0]).map((i, index) => (
                  <th
                    key={index}
                    className="border-y border-blue-gray-100 bg-blue-gray-50 p-4 text-sm font-semibold text-blue-gray-700 whitespace-nowrap">
                    {i}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowindex) => (
                <tr
                  key={rowindex}
                  className="border-b border-gray-300 text-[14px]">
                  {Object.keys(row).map((colKey, colIndex) => (
                    <td
                      key={colIndex}
                      className="p-4 align-top whitespace-pre-wrap">
                      <div className="max-w-[300px] break-words">
                        {row[colKey] ?? "-"}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={clear}
              className="bg-red-500 text-white rounded-md p-1 px-4 text-[14px]">
              Clear
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full scale-90">
          <div className="">
            <button
              onClick={() => inputRef.current.click()}
              className="bg-base-blue text-white font-semibold px-4 py-1 rounded-md">
              Upload
            </button>
            <input
              type="file"
              ref={inputRef}
              onChange={e => {
                setFile(e.target.files[0]);
                inputRef.current.value = null;
              }}
              className="invisible"
            />
          </div>
          <div className="flex flex-1 items-center  border-red-600 justify-center flex-col">
            <img
              src={bgfile}
              className="w-full h-full xl:max-w-[350px]  xl:max-h-[350px] object-contain"
              alt=""
            />
            <h4 className="text-center text-[24px] font-semibold text-gray-400 font-kumbh-sans">
              No File Yet
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
