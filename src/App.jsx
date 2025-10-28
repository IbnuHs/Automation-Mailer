import { useEffect, useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { Auth } from "./pages/Auth";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { msalConfig } from "./AuthConfig";
import { HomePage } from "./pages/HomePage";

const msalInstance = new PublicClientApplication(msalConfig);
function App() {
  msalInstance.initialize();

  return (
    <>
      <div className="max-h-screen">
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
