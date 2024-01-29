import { FcSearch } from "react-icons/fc";
import { BsFillPlusCircleFill } from "react-icons/bs";

const SearchBar = ({onOpen,filterContacts}) => {
  return (
    <div  className=" flex gap-2">
      <div className=" flex flex-grow relative items-center">
        <FcSearch  className=" text-white text-3xl absolute  ml-2" />
        <input onChange={filterContacts} type="text" className=" flex-grow h-10 rounded-md border border-white bg-transparent text-white pl-11" />
      </div>
      <BsFillPlusCircleFill onClick={onOpen} className="text-white text-4xl cursor-pointer"/>
    </div>
  )
}

export default SearchBar;