import React from "react";
import { Button } from "react-bootstrap";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (  
    <div className={showHideClassName}>
      <div className="modal-container">
      <Button href="javascript:;" size="sm" variant="danger" className="modal-close" onClick={handleClose}>X</Button>
          <br/>
        {children}
      
      </div>
    </div>
  );
};

export default Modal;
