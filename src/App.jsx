import { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { Auth } from "./pages/Auth";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { HomePages } from "./pages/HomePages";
import { msalConfig } from "./AuthConfig";
import { HomePage } from "./pages/HomePage";

const msalInstance = new PublicClientApplication(msalConfig);
function App() {
  msalInstance.initialize();
  const login = async () => {
    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ["Mail.Send"],
      });
      setAccount(loginResponse.account);
      console.log("Login success:", loginResponse);
    } catch (error) {
      console.error("Login error: ", error);
    }
  };

  const sendEmail = async () => {
    try {
      const tokenResponse = await msaInstance.acquireTokenSilent({
        scopes: ["Mail.Send"],
        account: msaInstance.getAllAccounts()[0],
      });

      const accessToken = tokenResponse.accessToken;

      const email = {
        message: {
          subject: "Tes Kirim Email via Microsoft Graph API",
          body: {
            contentType: "Text",
            content:
              "Halo, ini email test langsung dari React + Microsoft Graph API!",
          },
          toRecipients: [
            {
              emailAddress: {
                address: "ibnuhs30@gmail.com", // ganti dengan tujuan
              },
            },
          ],
        },
      };

      const response = await fetch(
        "https://graph.microsoft.com/v1.0/me/sendMail",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        }
      );

      if (response.ok) {
        setMessage("Email berhasil dikirim!");
      } else {
        const errorData = await response.json();
        setMessage("Gagal kirim email: " + JSON.stringify(errorData));
      }
    } catch (err) {
      console.error("Send mail error:", err);
      setMessage("Error: " + err.message);
    }
  };
  return (
    <>
      <div className="">
        <MsalProvider instance={msalInstance}>
          <UnauthenticatedTemplate>
            <div className="min-h-screen font-kumbh-sans bg-gray-50 flex justify-center items-center">
              <Auth />
            </div>
          </UnauthenticatedTemplate>
          <AuthenticatedTemplate>
            <HomePage />
          </AuthenticatedTemplate>
        </MsalProvider>
      </div>
    </>
  );
}

export default App;
