export const msalConfig = {
  auth: {
    clientId: "c630ee8c-07bb-4ca6-9755-3563c744057c",
    authority: "https://login.microsoftonline.com/common/",
    redirectUri: "https://automation-mailer.vercel.app/",
  },
  cache: {
    cahceLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
};

export const loginRequest = {
  scopes: ["User.Read", "Mail.Send"],
};
