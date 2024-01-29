import { createPortal } from "react-dom";
import { IoMdCloseCircle } from "react-icons/io";

const AdditionModel = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <div className=" absolute top-0 z-40 h-screen w-screen backdrop-blur grid place-items-center">
          <div className=" m-auto min-h-[200px] min-w-[25%] bg-white p-2 relative z-50 rounded-lg">
            <div className=" flex justify-end">
              <IoMdCloseCircle
                onClick={onClose}
                className="self-end text-2xl cursor-pointer"
              />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  ,document.getElementById("additionModel-root"));
};

export default AdditionModel;
