import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useMsal } from "@azure/msal-react";
// import { instance } from "./authConfig"; // msal instance kamu

export const useSendEmail = () => {
  const { accounts, instance } = useMsal();
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
    const tokenResponse = await instance.acquireTokenSilent({
      scopes: ["Mail.Send"],
      account: accounts[0],
    });
    const accessToken = tokenResponse.accessToken;
    const toList = cleanEmails(to);
    const ccList = cleanEmails(cc);
    const email = {
      message: {
        subject,
        body: {
          contentType: "HTML",
          content: body,
        },
        toRecipients: toList.map(address => ({ emailAddress: { address } })),
        ccRecipients:
          ccList?.map(address => ({ emailAddress: { address } })) || [],
      },
    };

    // Kirim request
    const response = await axios.post(
      "https://graph.microsoft.com/v1.0/me/sendMail",
      email,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  };

  const mutation = useMutation({
    mutationFn: sendEmailApi,
    onSuccess: (_, variables) => {
      console.log(`Email ke ${variables.to.join(", ")} berhasil dikirim.`);
    },
    onError: error => {
      console.error("Gagal kirim email:", error);
      alert("Gagal kirim email: " + error.message);
    },
  });

  return mutation;
};
