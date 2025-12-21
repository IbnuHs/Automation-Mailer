import { Button, Collapse } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSendEmail } from "../hook/useSendEmail";
import { htmlBody } from "../utils/bodyEmail";
import { FaCheck, FaHourglassEnd } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";
import { intransitTable } from "../utils/intransitTable";

export const SendEmail2 = ({
  data,
  setData,
  setAlreadySent,
  setActiveStep,
}) => {
  const [id, setId] = useState(null);
  const subject = localStorage.getItem("subject");
  const header = localStorage.getItem("header");
  const footer = localStorage.getItem("footer");
  const { mutate, mutateAsync } = useSendEmail();
  const [countDown, setCountDown] = useState(0);
  const [disableAllSend, setDisableAllSend] = useState(false);
  const [alreadySentAll, setAlreadySentAll] = useState(false);
  const grouped = Object.values(
    data.reduce((acc, item) => {
      const kode = item["Kode Dealer"] || item["KODE DEALER"];
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
  const replaceVariable = (variable = {}) => {
    const res = JSON.parse(template)
      .replace(/\n/g, "<br>")
      .replace(/{{(.*?)}}/g, (_, key) => {
        return variable[key.trim()] ?? "-";
      });
    return res;
  };
  const [statusList, setStatusList] = useState(() => {
    const saved = sessionStorage.getItem("statusList");
    return saved ? JSON.parse(saved) : {};
  });
  useEffect(() => {
    sessionStorage.setItem("statusList", JSON.stringify(statusList));
  }, [statusList]);

  const [pending, setPending] = useState(false);
  useEffect(() => {
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    setPending(false);
  }, [countDown]);
  const template = localStorage.getItem("templateIntransit");
  const email = JSON.parse(localStorage.getItem("email"));
  const handleSend = async (item, listEmail) => {
    // setPending(true);
    // setAlreadySent(true);
    const bodyEmail = replaceVariable({ table: intransitTable(item.data) });
    // console.log(bodyEmail);
    setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
    // setStatusList(prev => ({ ...prev, [item.kode]: "Sent" }));
    mutate(
      {
        body: bodyEmail,
        subject: subject,
        to: listEmail.email.split(","),
        cc: listEmail.emailcc.split(","),
      },
      {
        onSuccess: () => {
          setStatusList(prev => ({ ...prev, [item.kode]: "Sent" }));
          setPending(true);
          setCountDown(10);
          console.log("Berhasil dikirim");
        },
        onError: err => {
          setStatusList(prev => ({ ...prev, [item.kode]: "Failed" }));
          setPending(true);
          setCountDown(10);
          console.log(err);
        },
        onMutate: () => {
          setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
          // setPending(true);
          setCountDown(10);
        },
      }
    );
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    await delay(5000);
    setPending(false);
  };

  const sendAllEmail = async () => {
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    setDisableAllSend(true);
    for (const item of grouped) {
      const listEmail = email?.find(mail => mail.dealer === item.kode);
      const check = statusList[item.kode];
      if (!check && listEmail) {
        const bodyEmail = replaceVariable({ table: intransitTable(item.data) });
        setPending(false);
        setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
        await mutateAsync(
          {
            body: bodyEmail,
            subject: subject,
            to: listEmail.email.split(","),
            cc: listEmail.emailcc.split(","),
          },
          {
            onSuccess: () => {
              setStatusList(prev => ({ ...prev, [item.kode]: "Sent" }));
            },
            onError: e => {
              setStatusList(prev => ({ ...prev, [item.kode]: "Failed" }));
              console.log(e);
            },
            onMutate: () => {
              setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
              console.log("Sedang Mutate");
            },
          }
        );
        setPending(true);
        await delay(10000);
        // setStatusList(prev => ({ ...prev, [item.kode]: "Sent" }));
      }
      setAlreadySentAll(true);
    }
  };

  const reset = () => {
    sessionStorage.removeItem("statusList");
    sessionStorage.removeItem("data");
    setData(null);
    setActiveStep(0);
  };

  return (
    <div className="overflow-y-auto flex gap-3 flex-col px-8">
      <div className="flex justify-between">
        <Button
          color="red"
          size="sm"
          disabled={!data}
          className="text-[11px] flex items-center gap-2"
          onClick={reset}>
          Reset
        </Button>
        <Button
          color="green"
          size="sm"
          disabled={disableAllSend || pending}
          className="text-[11px] flex items-center gap-2"
          onClick={sendAllEmail}>
          Send All
        </Button>
      </div>
      {grouped.map((item, index) => {
        const listEmail = email?.find(mail => mail.dealer === item.kode);
        const status = statusList[item.kode];
        return (
          <div
            key={index}
            className="border-2 border-gray-400 rounded-md px-4 py-2 font-kumbh-sans">
            <div className="flex justify-between items-center">
              <div className="max-w-[70%]">
                <h5>{item["Nama Dealer"]}</h5>
                {listEmail ? (
                  <div className="text-[12px]">
                    <p>To : {listEmail.email}</p>
                    <p>Cc : {listEmail.emailcc}</p>
                  </div>
                ) : (
                  <div className="">
                    <p className="font-semibold">Kosong</p>
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                {id === index ? (
                  <Button
                    onClick={() => setId(null)}
                    className="bg-red-600 text-white px-4 py-1 text-[14px] rounded-md">
                    <IoClose className="text-[18px]" />
                  </Button>
                ) : (
                  <button
                    onClick={() => setId(index)}
                    className="bg-base-blue text-white px-4 py-1 text-[14px] rounded-md">
                    <IoIosArrowDown className="text-[18px]" />
                  </button>
                )}

                <button
                  onClick={() => handleSend(item, listEmail)}
                  disabled={pending || status === "Sent" || !listEmail}
                  className={`${
                    status === "Sent"
                      ? "bg-green-500 cursor-not-allowed"
                      : status === "Failed"
                      ? "bg-red-500"
                      : status === "Loading"
                      ? "bg-yellow-500"
                      : pending || !listEmail
                      ? "bg-orange-200 cursor-not-allowed"
                      : "bg-orange-500"
                  } flex items-center justify-center text-white px-4 py-1 text-[14px] rounded-md`}>
                  {status === "Sent" ? (
                    <FaCheck className="h-3 w-3" />
                  ) : status === "Loading" ? (
                    <CgSpinner className="h-3 w-3 animate-spin" />
                  ) : status !== "Sent" && pending && listEmail ? (
                    <FaHourglassEnd className="animate-spin" />
                  ) : (
                    <BsFillSendFill className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>

            <Collapse
              open={id === index}
              className="overflow-x-scroll max-w-[78vw]">
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{
                  __html: replaceVariable({ table: intransitTable(item.data) }),
                }}></div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};
