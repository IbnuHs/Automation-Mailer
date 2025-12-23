import { htmlBody } from "../utils/bodyEmail";

export const CheckTemplate = ({ data }) => {
  const subject = localStorage.getItem("subject");
  const template = localStorage.getItem("template");
  const grouped = Object.values(
    data?.reduce((acc, item) => {
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
  const replaceVariable = (variable = {}) => {
    const res = JSON.parse(template)?.replace(/{{(.*?)}}/g, (_, key) => {
      return variable[key.trim()] ?? "-";
    });
    return res;
  };
  const bodyEmail = replaceVariable({
    table: htmlBody(grouped[0]),
    dealer: grouped[0]["Nama Dealer"],
  });
  return (
    <div className="font-kumbh-sans flex px-20 flex-col gap-3 overflow-y-auto py-8">
      <div className="flex gap-2">
        <h5 className="font-semibold">Subject : </h5>
        <p>{JSON.parse(subject)}</p>
      </div>
      <div className="">
        <h5 className="font-semibold">Email :</h5>
        <div
          className="whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: bodyEmail }}></div>
      </div>
    </div>
  );
};
