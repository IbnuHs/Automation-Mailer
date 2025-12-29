import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

export const useSendEmail = () => {
  const cleanEmails = emails => {
    if (Array.isArray(emails)) {
      return emails
        .map(e => e.trim())
        .map(e => e.replace(/\u200B/g, ""))
        .filter(e => e.length > 0);
    }
    return (emails || "")
      .split(/[;,]+/)
      .map(e => e.trim())
      .map(e => e.replace(/\u200B/g, ""))
      .filter(e => e.length > 0);
  };

  const sendEmailApi = async ({ subject, body, to, cc }) => {
    const toList = cleanEmails(to);
    const ccList = cleanEmails(cc);
    // console.log(subject);
    const res = await axios.post(
      "https://backend-mailer-7raoled5e-ibnuhs-projects.vercel.app/api/send/mail",
      {
        subject,
        body,
        to: toList,
        cc: ccList,
      }
    );
    return res.data;
    // console.log(toList);
  };

  const mutation = useMutation({
    mutationFn: sendEmailApi,
    onError: error => {
      Swal.fire({
        title: "Error",
        text: error.message,
      });
      console.error("Gagal kirim email:", error);
      // alert("Gagal kirim email: " + error.message);
    },
  });

  return mutation;
};
