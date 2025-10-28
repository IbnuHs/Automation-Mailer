import { Button, Collapse } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { BsFillSendFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSendEmail } from "../hook/useSendEmail";
import { htmlBody } from "../utils/bodyEmail";
import { FaCheck } from "react-icons/fa";
import { CgSpinner } from "react-icons/cg";

export const SendEmail = ({ data, setAlreadySent }) => {
  const [id, setId] = useState(null);
  const subject = localStorage.getItem("subject");
  const header = localStorage.getItem("header");
  const footer = localStorage.getItem("footer");
  const { mutate } = useSendEmail();
  const [countDown, setCountDown] = useState(0);
  const grouped = Object.values(
    data.reduce((acc, item) => {
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
  const [statusList, setStatusList] = useState({});
  const [pending, setPending] = useState(false);
  let isPendingThrottle = countDown > 0;
  useEffect(() => {
    console.log(pending);
    if (countDown > 0) {
      const timer = setInterval(() => {
        setCountDown(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
    setPending(false);
  }, [countDown]);

  const email = JSON.parse(localStorage.getItem("email"));
  const handleSend = (item, listEmail) => {
    setPending(true);
    setAlreadySent(true);
    const fullBody = `<p style="font-size:16px; font-family:serif;">${header.replace(
      /\n/g,
      "<br>"
    )}</p>
        <br/>
        ${htmlBody(item)}
        <br/>
        <p style="font-size:16px;font-family:serif;">${footer.replace(
          /\n/g,
          "<br>"
        )}</p>
        `;
    setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
    // setCountDown(30);
    mutate(
      {
        body: fullBody,
        subject: subject,
        to: listEmail.email.split(","),
        cc: listEmail.emailcc.split(","),
      },
      {
        onSuccess: () => {
          setStatusList(prev => ({ ...prev, [item.kode]: "Sent" }));
          // setPending(true);
          setCountDown(10);
        },
        onError: () => {
          setStatusList(prev => ({ ...prev, [item.kode]: "Failed" }));
          // setPending(true);
          setCountDown(10);
        },
        onMutate: () => {
          setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
          // setPending(true);
          setCountDown(10);
        },
      }
    );
  };
  const waitForCountdown = () => {
    return new Promise(resolve => {
      const checkCountdown = setInterval(() => {
        setCountDown(prev => {
          if (prev <= 0) {
            clearInterval(checkCountdown);
            resolve();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });
  };

  const sendAllEmail = async () => {
    for (const item of grouped) {
      const listEmail = email?.find(mail => mail.dealer === item.kode);
      if (!listEmail) continue;
      const fullBody = `${header}
      <br/>
      ${htmlBody(item)}
      <br/>
      ${footer}
    `;

      setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));

      mutate(
        {
          body: fullBody,
          subject: subject,
          to: listEmail.email.split(","),
          cc: listEmail.emailcc.split(","),
        },
        {
          onSuccess: () => {
            setStatusList(prev => ({ ...prev, [item.kode]: "Sent" }));
          },
          onError: () => {
            setStatusList(prev => ({ ...prev, [item.kode]: "Failed" }));
          },
          onMutate: () => {
            setStatusList(prev => ({ ...prev, [item.kode]: "Loading" }));
            setCountDown(10);
          },
        }
      );
      setCountDown(10);
      await waitForCountdown();
    }
  };

  return (
    <div className="overflow-y-auto flex gap-3 flex-col">
      {/* <Button onClick={sendAllEmail}>Click</Button> */}
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
                  <button
                    onClick={() => setId(null)}
                    className="bg-red-600 text-white px-4 py-1 text-[14px] rounded-md">
                    <IoClose className="text-[18px]" />
                  </button>
                ) : (
                  <button
                    onClick={() => setId(index)}
                    className="bg-base-blue text-white px-4 py-1 text-[14px] rounded-md">
                    <IoIosArrowDown className="text-[18px]" />
                  </button>
                )}

                <button
                  onClick={() => handleSend(item, listEmail)}
                  disabled={pending || status === "Sent"}
                  className={`${
                    status === "Sent"
                      ? "bg-green-500 cursor-not-allowed"
                      : status === "Failed"
                      ? "bg-red-500"
                      : status === "Loading"
                      ? "bg-yellow-500"
                      : pending
                      ? "bg-orange-100 cursor-not-allowed"
                      : "bg-orange-500"
                  } flex items-center justify-center text-white px-4 py-1 text-[14px] rounded-md`}>
                  {status === "Sent" ? (
                    <FaCheck className="h-3 w-3" />
                  ) : status === "Loading" ? (
                    <CgSpinner className="h-3 w-3 animate-spin" />
                  ) : status !== "Sent" && pending && countDown > 0 ? (
                    <p>{countDown}</p>
                  ) : (
                    <BsFillSendFill className="h-3 w-3" />
                  )}
                </button>
              </div>
            </div>
            <Collapse open={id === index}>
              <div
                className="mt-5"
                dangerouslySetInnerHTML={{ __html: htmlBody(item) }}></div>
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};
