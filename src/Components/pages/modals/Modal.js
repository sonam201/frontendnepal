import React from "react";

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <div
      className="fixed inset-0  bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center "
      onClick={handleClose}
      id="wrapper"
    >
      <div className="w-[600px] max-h-[50%] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded overflow-hidden overflow-y-scroll md:mx-[20px]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
