export const htmlBody = data => {
  // console.log(data);
  return `
  <div style="width: fit-content;">
    <h2 style = "text-align:center;font-size:16px;">${data["Nama Dealer"]}</h2>
    <table border="1" cellspacing="0" cellpadding="4" 
      style="border-collapse:collapse;font-family:Arial,sans-serif;text-align:center;font-size:14px;margin-bottom:15px;border:1px solid #000;">
      <thead style="background:#002060;color:white;text-align:left;">
        <tr>
          <th style="border:1px solid #000; text-align:center;">Nama Dealer</th>
          <th style="border:1px solid #000; text-align:center;">Nomes</th>
          <th style="border:1px solid #000; text-align:center;">Kode Type</th>
          <th style="border:1px solid #000; text-align:center;">Nama Type</th>
          <th style="border:1px solid #000; text-align:center;">Tahun Rakitan</th>
          <th style="border:1px solid #000; text-align:center;">Warna</th>
          <th style="border:1px solid #000; text-align:center;">Tanggal SSU</th>
        </tr>
      </thead>
      <tbody>
        ${data.data
          .map(
            row => `
            <tr>
              <td style="border:1px solid #000;">${
                row["Nama Dealer"] ?? "-"
              }</td>
              <td style="border:1px solid #000;">${row["Nomes"] ?? "-"}</td>
              <td style="border:1px solid #000;">${row["Kode Type"] ?? "-"}</td>
              <td style="border:1px solid #000;">${row["Nama Type"] ?? "-"}</td>
              <td style="border:1px solid #000;">${
                row["Tahun Rakitan"] ?? "-"
              }</td>
              <td style="border:1px solid #000;">${row["Warna"] ?? "-"}</td>
              <td style="border:1px solid #000;">${
                row["Tanggal SSU "] ?? row["Tanggal SSU"] ?? "-"
              }</td>
            </tr>
          `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;
};
