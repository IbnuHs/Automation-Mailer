import React, { useEffect, useRef, useState } from "react";
import bgfile from "../assets/Email marketing and newsletter content.png";
import * as xlsx from "xlsx";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

export const UploadCSV = ({ data, setData, setActiveStep }) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  useEffect(() => {
    let reader = new FileReader();
    if (file) {
      reader.onload = evt => {
        const bstr = evt.target.result;
        const workbook = xlsx.read(bstr, { type: "array" });
        const worksheetname = workbook.SheetNames[0];
        const worksheets = workbook.Sheets[worksheetname];
        const jsonData = xlsx.utils.sheet_to_json(worksheets, {
          defval: "",
          blankrows: true,
        });
        setData(jsonData);
        sessionStorage.setItem("data", JSON.stringify(jsonData));
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);
  const clear = () => {
    Swal.fire({
      title: "Question",
      text: "Ingin Menghapus Data?",
      icon: "question",
      showCancelButton: true,
      showConfirmButton: true,
    }).then(res => {
      if (res.isConfirmed) {
        setFile(null);
        sessionStorage.removeItem("data");
        setData(null);
      }
    });
  };
  return (
    <div className="font-kumbh-sans flex flex-col min-h-0 h-full flex-1 overflow-auto">
      {data ? (
        <div className="font-kumbh-sans flex flex-col flex-1 min-h-0">
          <div className="flex justify-start">
            <button
              type="button"
              onClick={clear}
              className="bg-red-500 text-white rounded-md py-1.5 px-6 text-[14px]">
              <MdDelete className="text-[18px]" />
            </button>
          </div>
          <table className="w-full table-fixed text-left whitespace-normal break-words mt-5">
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
              Upload File Old Stock
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};
