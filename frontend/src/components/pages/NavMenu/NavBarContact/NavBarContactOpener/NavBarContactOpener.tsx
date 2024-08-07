import React, { useState } from "react";
import { ContactContent } from "../../../../ContactContent/ContactContent";

export const NavBarContactOpener = () => {
  const [modal, setModal] = useState<boolean>(false);

  const toggleModalContactContent = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <button className="nav_btn-contact" onClick={toggleModalContactContent}>
        <span>CONTACT</span>
        <div className="fa fa-arrow-right"></div>
      </button>
      {modal && <ContactContent onClick={toggleModalContactContent} />}
    </>
  );
};
