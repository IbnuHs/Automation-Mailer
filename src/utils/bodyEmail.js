export const htmlBody = data => {
  const header = Object.keys(data.data[0]).filter(
    key => key.toLocaleLowerCase() !== "kode dealer"
  );
  return `
  <div style="width: fit-content;">
    <h2 style = "text-align:center;font-size:18px; margin-bottom:0px;font-weight:500;">${
      data["Nama Dealer"]
    }</h2>
    <table border="1" cellspacing="0" cellpadding="4" 
      style="border-collapse:collapse;font-family:Arial,sans-serif;text-align:center;font-size:14px;border:1px solid #000;">
      <thead style="color:white;text-align:left;">
        <tr>
          ${header
            .map(
              i => `
            <th style="background:#002060; color:white; border:1px solid #000; text-align:center; padding:2px 8px;">${i}</th>
          `
            )
            .join("")}
          
        </tr>
      </thead>
      <tbody>
        ${data.data
          .map(
            row => `
            <tr>
            ${Object.keys(row)
              .filter(key => key.toLocaleLowerCase() !== "kode dealer")
              .map(
                key =>
                  `
              <td style="border:1px solid #000; padding:2px 8px;">${
                row[key] ?? "-"
              }</td>
            `
              )
              .join("")}
             
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;
};
