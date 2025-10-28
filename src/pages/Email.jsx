import React, { useEffect, useRef, useState } from "react";
import * as xlsx from "xlsx";
import { TableEmail } from "../components/TableEmail";
import bgEmail from "../assets/Email marketing and newsletter content.svg";

export const Email = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const hanldeClick = () => {
    fileInputRef.current.click();
  };
  const [data, setData] = useState(null);
  const [emailSaved, setEmailSaved] = useState(null);
  const email = localStorage.getItem("email");
  useEffect(() => {
    const item = localStorage.getItem("email");
    if (item) {
      setEmailSaved(JSON.parse(item));
    }
  }, []);
  useEffect(() => {
    const reader = new FileReader();
    if (file) {
      reader.onload = evt => {
        const bstr = evt.target.result;
        const workbook = xlsx.read(bstr, { type: "array" });
        const worksheetname = workbook.SheetNames[0];
        const worksheets = workbook.Sheets[worksheetname];
        const jsonData = xlsx.utils.sheet_to_json(worksheets);
        setData(jsonData);
      };
      reader.readAsArrayBuffer(file);
    }
  }, [file]);
  const saveEmail = () => {
    localStorage.setItem("email", JSON.stringify(data));
  };
  const deleteEmail = () => {
    localStorage.removeItem("email");
    setEmailSaved(null);
    setData(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const displayData = data || emailSaved;

  return (
    <div className="flex h-full flex-col flex-1">
      <div className="">
        <button
          onClick={hanldeClick}
          className="bg-base-blue text-[14px] font-kumbh-sans px-4 py-2 text-white rounded">
          + Upload
        </button>
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={e => setFile(e.target.files[0])}
        />
      </div>
      {!data && !email && (
        <div className="mt-5">
          <img src={bgEmail} alt="" className=" h-full max-w-[40%] m-auto" />
          <h4 className="text-gray-400 font-kumbh-sans text-[32px] text-center">
            No Email Yet
          </h4>
        </div>
      )}
      {displayData && (
        <div className="flex flex-col h-[calc(100vh-120px)]">
          <div className="py-10 flex flex-col gap-5 overflow-y-scroll">
            {data
              ? data.map((i, index) => <TableEmail data={i} key={index} />)
              : emailSaved.map((i, index) => (
                  <TableEmail data={i} key={index} />
                ))}
          </div>
          <div className="flex justify-end gap-3 my-5">
            <button
              onClick={saveEmail}
              className="bg-base-blue text-[14px] font-kumbh-sans px-4 py-2 text-white rounded">
              Save
            </button>
            <button
              onClick={deleteEmail}
              className="bg-red-500 text-[14px] font-kumbh-sans px-4 py-2 text-white rounded">
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
