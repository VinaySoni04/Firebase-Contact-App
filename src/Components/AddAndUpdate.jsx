import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import AdditionModel from "./AdditionModel";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { db } from "../Config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation=Yup.object().shape({
  name:Yup.string().required("Name is required"),
  mobile:Yup.string().required("Mobile No. is required")
})

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact=async(contact)=>{
    try {
      const contactRef=collection(db,"Contacts");
      await addDoc(contactRef,contact);
      toast.success("Contact added successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  

  const updateContact=async(contact,id)=>{
    try {
      const contactRef=doc(db,"Contacts",id);
      await updateDoc(contactRef,contact);
      toast.success("Contact updated successfully");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AdditionModel isOpen={isOpen} onClose={onClose}>
        {/* Formik is an external library used for handling forms */}
        <Formik 
        validationSchema={contactSchemaValidation}
        initialValues={isUpdate?{
          name:contact.name,
          mobile:contact.mobile
        }:{
          name:"",
          mobile:""
        }}
        onSubmit={(values)=>{
          console.log(values);
          isUpdate?updateContact(values,contact.id):addContact(values);
        }} >
          <Form className=" flex flex-col gap-4">
            <div className=" flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              {/* For input, we use field from Formik library */}
              <Field name="name" className="border h-10 rounded-lg" />
              <div className=" text-red-600 text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className=" flex flex-col gap-1">
              <label htmlFor="mobile">Mobile No.</label>
              {/* For input, we use field from Formik library */}
              <Field name="mobile" className="border h-10 rounded-lg" />
              <div className=" text-red-600 text-xs">
                <ErrorMessage name="mobile" />
              </div>
            </div>
            <button className=" bg-sky-300 px-4 py-2 self-center rounded-xl">{isUpdate?"Update":"Add"}</button>
          </Form>
        </Formik>
      </AdditionModel>
    </div>
  );
};

export default AddAndUpdate;
