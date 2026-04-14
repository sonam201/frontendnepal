const MyModal = ({ isvisible, onClose, children }) => {
  if (!isvisible) return null;
  //drps the modal if the user preses outside of the modal
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <>
      <div
        className=" fixed inset-0 bg-black opacity-80 backdrop-blur-3xl flex justify-center pt-[20px]  "
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[700px] flex flex-col">
          <div className="bg-white p-2 rounded-lg ">
            {children}
            <button
              onClick={() => onClose()}
              className=" flex mt-[-30px] relative left-[180px] border-2 px-5 border-black bg-red-500 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MyModal;
