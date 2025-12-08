import React, { useState } from "react";
import { MdEdit } from "react-icons/md";

export const Template = () => {
  const [subject, setSubject] = useState("");
  const saveSubject = () => {
    if (subject) {
      setSubject("");
      localStorage.setItem("subject", subject);
      return;
    }
  };
  const [header, setHeader] = useState("");
  const saveHeader = () => {
    if (header) {
      localStorage.setItem("header", header);
      setHeader("");
      return;
    }
  };
  const [bodyTemplate, setBodyTemplate] = useState("");

  const [footer, setFooter] = useState("");
  const saveFooter = () => {
    if (footer) {
      setFooter("");
      localStorage.setItem("footer", footer);
      return;
    }
  };
  const savedTemplate = localStorage.getItem("template");
  const subj = localStorage.getItem("subject");
  const head = localStorage.getItem("header");
  const foot = localStorage.getItem("footer");
  const template = JSON.parse(savedTemplate) ?? null;
  const [onEdit, setOnEdit] = useState(false);
  const [localTemplate, setLocalTemplate] = useState(() => {
    const temp = localStorage.getItem("template");
    return temp ? JSON.parse(temp) : "";
  });
  const saveTemplate = () => {
    localStorage.setItem("template", JSON.stringify(localTemplate));
    setOnEdit(false);
    alert("Berhasil Menyimpan Template");
  };
  return (
    <div className="w-full flex flex-col flex-1 font-kumbh-sans overflow-auto">
      <div className="font-kumbh-sans text-gray-600 flex gap-2 items-center">
        <MdEdit className="" />
        <h1>Template</h1>
      </div>
      <div className="flex h-auto gap-4 flex-1 py-5">
        <div className="flex flex-col gap-3 flex-1 h-full">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              placeholder={subj}
              onChange={e => {
                setSubject(e.target.value);
              }}
              className="border-2 px-2 py-1 focus:outline-none border-gray-300 rounded w-full"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={saveSubject}
                className="bg-base-blue text-white px-4 rounded-md py-1 text-[14px]">
                Save
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Template
            </label>
            {onEdit ? (
              <textarea
                type="text"
                placeholder={template}
                value={localTemplate}
                onChange={e => setLocalTemplate(e.target.value)}
                className="border-2 flex-1 rounded w-full p-2 border-green-300 shadow-md shadow-green-100 focus:outline-none resize-y overflow-auto"
              />
            ) : (
              <div className="border p-2 rounded-md border-gray-200 flex-1">
                <p className="whitespace-pre-wrap">{localTemplate}</p>
              </div>
            )}
            <div className="flex justify-end">
              {onEdit ? (
                <button
                  onClick={saveTemplate}
                  className="bg-base-blue text-white px-4 rounded-md py-1 text-[14px]">
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setOnEdit(true)}
                  className="bg-green-700 text-white px-4 rounded-md py-1 text-[14px]">
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="max-w-[350px] w-full flex flex-col gap-4">
          <div className="border-2 p-4 rounded-md flex flex-col gap-4">
            <h3 className="font-semibold text-center">Variabel</h3>
            <div className="bg-gray-100 flex gap-3 min-h-[100px] p-3 text-gray-800">
              <p>{"{{dealer}}"}</p>
              <p>{"{{table}}"}</p>
            </div>
            <p className="text-[12px] font-semibold text-red-600 leading-3">
              Note : Tulis nama variabel beserta kurung kurawal {"{"} {"}"}{" "}
              untuk digunakan
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
