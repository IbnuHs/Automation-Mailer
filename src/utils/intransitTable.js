export function intransitTable(data) {
  const groupBySegment = data.reduce((acc, item) => {
    const segment =
      item.Segment && item.Segment.trim() !== ""
        ? item.Segment.trim()
        : "UNKNOWN";
    if (!acc[segment]) {
      acc[segment] = [];
    }
    acc[segment].push(item);
    return acc;
  }, {});
  //   console.log(groupBySegment(grouped[7].data));
  const convertPerContainer = intransit =>
    Object.values(
      intransit.reduce((acc, row) => {
        acc[row["No.Container"]] ??= {
          container: row["No.Container"],
          eta: row.ETA,
          ata: row.ATA,
        };
        return acc;
      }, {})
    );
  const header = convertPerContainer(data);
  const pivot = pvt => {
    const result = pvt.reduce((acc, item) => {
      const type = item["Nama Type"];
      const container = item["No.Container"] || "-";
      if (!acc[type]) {
        acc[type] = {};
        header.forEach(h => {
          acc[type][h.container || "-"] = 0;
        });
      }
      if (acc[type][container] !== undefined) {
        acc[type][container] += 1;
      }
      return acc;
    }, {});

    return result;
  };
  const normalizeContainer = v => (v && v.trim() !== "" ? v.trim() : "-");

  const totalPerContainer = rows => {
    // inisialisasi semua container = 0
    const result = header.reduce((acc, h) => {
      acc[normalizeContainer(h.container)] = 0;
      return acc;
    }, {});

    // hitung data yang ada
    rows.forEach(item => {
      const container = normalizeContainer(item["No.Container"]);
      if (result[container] !== undefined) {
        result[container] += 1;
      }
    });

    return result;
  };
  // console.log(totalPerContainer(data));

  const htmlBody = `
  <table border="1" cellspacing="0" cellpadding="0" 
    style="border-collapse:collapse;width:100%;font-family:Arial, sans-serif;font-size:12px;margin:15px 0; white-space: normal;">
    <thead style="background:#002060;color:white;text-align:left;">
      <tr>
        <th style="background:#BE5014;text-align:center;">No Container</th>
        ${header
          .map(
            item => `
          <th style="background:#BE5014;text-align:center;">${
            item.container ? item.container : "-"
          }</th>
        `
          )
          .join("")}
        </tr>
      <tr style="background-color:#F4B084;color:black;">
        <th style="padding:0 2px;">ETA</th>
        ${header
          .map(
            item => `
          <th style="text-align:center;">${item.eta ? item.eta : "-"}</th>
        `
          )
          .join("")}
        </tr>
      <tr style="background-color:#F4B084;color:black;">
        <th style="padding:0 2px;">ATA</th>
        ${header
          .map(
            item => `
          <th style="text-align:center;">${item.ata ? item.ata : "-"}</th>
        `
          )
          .join("")}
        </tr>
        </thead>
        <tbody>
            <tr>
                <td style="font-weight:bold;background-color:#002060;padding:0 2px;color:white;">TYPE</td>
                ${Object.keys(header)
                  .map(
                    item => `
                    <td style="text-align:center;font-weight:bold;background-color:#002060;color:white;">QTY</td>
                `
                  )
                  .join("")}
            </tr>
           ${Object.entries(groupBySegment)
             .map(
               ([segment, types]) => `
            ${Object.entries(pivot(types))
              .map(
                ([type, containers], index) => `
                <tr style="background:${
                  index % 2 === 1 ? "#f2f2f2" : "white"
                };">
                  <td style="padding:0 2px;">${type}</td>
                  ${header
                    .map(h => {
                      const key = h.container || "-";
                      return `
                      <td style="padding:3px 6px;font-size:12px;text-align:center;">
                        ${containers[key] ?? 0}
                      </td>
                    `;
                    })
                    .join("")}
                    
                </tr>
              `
              )
              .join("")}
              <tr>
                <td style="white-space:normal;font-weight:bold;background-color:#002060;color:white;padding:0 2px;">TOTAL ${segment}</td>
                ${Object.values(totalPerContainer(types))
                  .map(
                    item => `
                <td style="white-space:normal;font-weight:bold;background-color:#002060;color:white;text-align:center;">${item}</td>
                `
                  )
                  .join("")}
              </tr>            
            `
             )
             .join("")}
             <tr style="background-color:yellow;color:black;">
             <td style="white-space:normal;font-weight:bold;">GRAND TOTAL</td>
              ${Object.values(totalPerContainer(data))
                .map(
                  item => `
                <td style="white-space:normal;font-weight:bold;text-align:center;">${item}</td>
                `
                )
                .join("")}
             </tr>
  </tbody>
        </table>
        `;

  return htmlBody;
}
