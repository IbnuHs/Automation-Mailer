export function openEmailClient(email, subject) {
  console.log(email.emailcc);
  const emlContent = `
        To: ${email.email}
        Cc: ${email.emailcc}
        Subject: tes
        Content-Type: text/html; charset="UTF-8"

        <!DOCTYPE html>
        <html>
        <body style="font-family:Arial">
        </body>
        </html>
    `.trim();
  const blob = new Blob([emlContent], {
    type: "message/rfc822",
  });

  const url = URL.createObjectURL(blob);

  window.open(url);
}
