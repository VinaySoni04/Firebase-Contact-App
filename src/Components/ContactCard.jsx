import { HiOutlineUserCircle } from "react-icons/hi";
import { BsTrash3Fill } from "react-icons/bs";
import { MdModeEditOutline } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import OpenAndClose from "../Hooks/OpenAndClose";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const ContactCard = ({ contact }) => {
  const { onClose, onOpen, isOpen } = OpenAndClose();
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "Contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className=" flex justify-between items-center p-2 rounded-2xl bg-blue-100"
      >
        <div className="flex gap-2">
          <HiOutlineUserCircle className=" text-4xl text-green-950" />
          <div className="">
            <h2 className=" font-medium">{contact.name}</h2>
            <p className=" text-sm">{contact.mobile}</p>
          </div>
        </div>
        <div className=" flex text-xl gap-2">
          <BsTrash3Fill
            onClick={() => deleteContact(contact.id)}
            className=" cursor-pointer"
          />
          <MdModeEditOutline onClick={onOpen} className=" cursor-pointer" />
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onClose={onClose} contact={contact} isUpdate />
    </>
  );
};

export default ContactCard;
