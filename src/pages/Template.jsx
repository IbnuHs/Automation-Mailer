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
  const [footer, setFooter] = useState("");
  const saveFooter = () => {
    if (footer) {
      setFooter("");
      localStorage.setItem("footer", footer);
      return;
    }
  };
  const subj = localStorage.getItem("subject");
  const head = localStorage.getItem("header");
  const foot = localStorage.getItem("footer");
  // useState(() => {
  //   console.log(subj, head, foot);
  // }, [subj, head, foot]);

  return (
    <div className="w-full font-kumbh-sans overflow-auto">
      <div className="font-kumbh-sans text-gray-600 flex gap-2 items-center">
        <MdEdit className="" />
        <h1>Template</h1>
      </div>
      <div className="flex gap-4">
        <div className="mt-5 flex flex-col gap-3 flex-1">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={e => {
                setSubject(e.target.value);
              }}
              className="border-2 px-2 py-1 border-gray-300 rounded w-full"
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
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Pembuka
            </label>
            <textarea
              type="text"
              rows={3}
              value={header}
              onChange={e => {
                setHeader(e.target.value);
              }}
              className="border-2 rounded w-full p-2"
            />
            <div className="flex justify-end">
              <button
                onClick={saveHeader}
                className="bg-base-blue text-white px-4 rounded-md py-1 text-[14px]">
                Save
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Footer
            </label>
            <textarea
              type="text"
              rows={3}
              value={footer}
              onChange={e => {
                setFooter(e.target.value);
              }}
              className="border-2 rounded w-full p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={saveFooter}
              type="button"
              className="bg-base-blue text-white px-4 rounded-md py-1 text-[14px]">
              Save
            </button>
          </div>
        </div>
        <div className="max-w-[350px] w-full border-2 p-4 rounded-md flex flex-col gap-4">
          <h3 className="font-semibold text-center">Body Email</h3>
          <div className="">
            <h3 className="">Subject</h3>
            <p className="bg-gray-300 p-1 rounded text-gray-700  text-wrap">
              {subj ? subj : "Kosong"}
            </p>
          </div>
          <div className="">
            <h3 className="">Header</h3>
            <p className="bg-gray-300 p-1 rounded text-gray-700 ">
              {head ? head : "Kosong"}
            </p>
          </div>
          <div className="">
            <h3 className="">Footer</h3>
            <p className="bg-gray-300 p-1 rounded text-gray-700 ">
              {foot ? foot : "Kosong"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
