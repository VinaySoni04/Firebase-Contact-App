import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./Config/firebase";
import ContactCard from "./Components/ContactCard";
import OpenAndClose from "./Hooks/OpenAndClose";
import AddAndUpdate from "./Components/AddAndUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./Components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { onClose, onOpen, isOpen } = OpenAndClose();
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsReference = collection(db, "Contacts");
        // const contactsSnapshots = await getDocs(contactsReference); // Snapshot stored data. We can get only necessary data using getDocs.
        onSnapshot(contactsReference, (snapshot) => {
          const contactsList = snapshot.docs.map((doc) => {
            return {
              // Returning an object
              id: doc.id,
              ...doc.data(), // This expression is used to retrieve the data stored in a document snapshot.
            };
          });
          setContacts(contactsList);
          return contactsList;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (ele) => {
    const value = ele.target.value;
    const contactsReference = collection(db, "Contacts");
    onSnapshot(contactsReference, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => {
        return {
          // Returning an object
          id: doc.id,
          ...doc.data(), // This expression is used to retrieve the data stored in a document snapshot.
        };
      });
      const filteredContacts=contactsList.filter(contact=>
        contact.name.toLowerCase().includes(value.toLowerCase())  
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <SearchBar onOpen={onOpen} filterContacts={filterContacts} />
        <div className=" flex flex-col mt-4 gap-2">
          {contacts.length<=0?<NotFoundContact />:contacts.map((contact) => (
            <ContactCard key={contacts.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdate isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="top-left" />
    </>
  );
};

export default App;
