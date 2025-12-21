import React, { useEffect, useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";

export const Template = props => {
  const [subj, setSubject] = useState("");
  const [localTemplate, setLocalTemplate] = useState("");
  useEffect(() => {
    const subject = localStorage.getItem(props.subjectname);
    setSubject(subject ? JSON.parse(subject) : "");
    const temp = localStorage.getItem(props.templatename);
    setLocalTemplate(temp ? JSON.parse(temp) : "");
  }, [props.subjectname]);
  const saveTemplate = () => {
    localStorage.setItem(props.subjectname, JSON.stringify(subj));
    localStorage.setItem(props.templatename, JSON.stringify(localTemplate));
    Swal.fire({
      title: "Success",
      text: "Berhasil Menyimpan Template",
      icon: "success",
    });
  };

  return (
    <div className="w-full flex flex-col flex-1 font-kumbh-sans overflow-auto bg-white p-10">
      <div className="flex justify-between items-center">
        <div className="font-kumbh-sans text-gray-600 flex gap-2 items-center">
          <MdEdit className="" />
          <h1 className="text-lg font-semibold">Template {props.title}</h1>
        </div>
        <button
          onClick={saveTemplate}
          className="font-semibold bg-blue-600 text-white py-1 px-3 text-[14px] rounded">
          Save Template
        </button>
      </div>
      <div className="flex h-auto gap-4 flex-1 py-5">
        <div className="flex flex-col gap-3 flex-1 h-full border-2 p-4 rounded-md">
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Subject Email
            </label>
            <input
              type="text"
              value={subj}
              onChange={e => {
                setSubject(e.target.value);
              }}
              className="border-2 px-2 py-1 focus:outline-none border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <label htmlFor="" className="font-semibold font-kumbh-sans">
              Body Email
            </label>
            <textarea
              type="text"
              value={localTemplate}
              onChange={e => setLocalTemplate(e.target.value)}
              className="border-2 flex-1 rounded w-full p-2  focus:outline-gray-700 resize-y overflow-auto"
            />
          </div>
        </div>
        <div className="max-w-[350px] w-full flex flex-col">
          <div className="border-2 rounded-md flex flex-col">
            <h3 className="font-semibold border-b-2 mb-2 py-2 px-4">
              Variabel
            </h3>
            <div className="min-h-[100px] flex gap-2 px-4 text-gray-800">
              <p className="float-start bg-gray-200 h-fit py-0.5 px-2 rounded text-gray-800 ">
                {"{{dealer}}"}
              </p>
              <p className="float-start bg-gray-200 py-0.5 h-fit px-2 rounded text-gray-800 ">
                {"{{table}}"}
              </p>
            </div>
            <div className="m-4 p-3 rounded flex gap-2 bg-indigo-50 text-blue-500">
              <IoIosInformationCircleOutline className=" text-[24px]" />
              <p className="text-[12px] font-semibold leading-5">
                Tulis nama variabel beserta kurung kurawal {"{"} {"}"} untuk
                digunakan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
