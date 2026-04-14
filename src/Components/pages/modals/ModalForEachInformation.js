const MyModal5 = ({ isvisible, onClose, children }) => {
  if (!isvisible) return null;
  //drps the modal if the user preses outside of the modal
  const handleClose = (e) => {
    if (e.target.id === "wrapper") onClose();
  };
  return (
    <>
      <div
        className=" fixed inset-0 bg-black opacity-95 backdrop-blur-3xl flex justify-center pt-[80px]  "
        id="wrapper"
        onClick={handleClose}
      >
        <div className="w-[800px] flex flex-col">
          <div className="bg-[#FFF2CC] p-2 rounded-lg ">
            <button
              onClick={() => onClose()}
              className="px-2 relative left-[45%] border-2  border-transparent text-red-600 "
            >
              x
            </button>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
export default MyModal5;
