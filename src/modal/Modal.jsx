"use client";

import { useState } from "react";

export function ModalDealer({ openModal, setOpenModal }) {
  const [email, setEmail] = useState("");
  const [dealer, setDealer] = useState("");
  const [emailBcc, setEmailBcc] = useState("");

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }
  const addDealer = () => {
    let emailAddress = localStorage.getItem("email");
    emailAddress = emailAddress ? JSON.parse(emailAddress) : [];
    console.log(emailAddress);
    const index = emailAddress.findIndex(item => item.dealer === dealer);
    if (index !== -1) {
      emailAddress[index] = {
        dealer: dealer,
        email: email,
        emailBcc: emailBcc,
      };
      alert("Data dealer berhasil diupdate");
    } else {
      emailAddress.push({
        dealer: dealer,
        email: email,
        emailBcc: emailBcc,
      });
      alert("Berhasil menambahkan dealer");
    }
    localStorage.setItem("email", JSON.stringify(emailAddress));
  };

  // return (
  //   <>
  //     <Button
  //       color={"gray"}
  //       className="px-4"
  //       size="xs"
  //       onClick={() => setOpenModal(true)}>
  //       Add
  //     </Button>
  //     <Modal show={openModal} size="md" onClose={onCloseModal} popup>
  //       <ModalHeader />
  //       <ModalBody>
  //         <div className="space-y-6">
  //           <div>
  //             <div className="mb-2 block">
  //               <Label htmlFor="email">Dealer</Label>
  //             </div>
  //             <TextInput
  //               id="dealer"
  //               placeholder="8002"
  //               value={dealer}
  //               onChange={event => setDealer(event.target.value)}
  //               required
  //             />
  //           </div>
  //           <div>
  //             <div className="block">
  //               <Label htmlFor="email">Email To</Label>
  //             </div>
  //             <Textarea
  //               id="email"
  //               placeholder="name@company.com"
  //               value={email}
  //               onChange={event => setEmail(event.target.value)}
  //               required
  //             />
  //           </div>
  //           <div>
  //             <div className="block">
  //               <Label htmlFor="email">Email CC</Label>
  //             </div>
  //             <Textarea
  //               id="email"
  //               placeholder="name@company.com"
  //               value={emailBcc}
  //               onChange={event => setEmailBcc(event.target.value)}
  //               required
  //             />
  //           </div>

  //           <div className="w-full flex items-center justify-center">
  //             <Button
  //               color={"gray"}
  //               size="md"
  //               type="button"
  //               onClick={addDealer}>
  //               Submit
  //             </Button>
  //           </div>
  //         </div>
  //       </ModalBody>
  //     </Modal>
  //   </>
  // );
}
