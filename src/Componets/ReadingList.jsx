import { useContext } from "react";
import { readingListContext } from "../Context/ReadingListProvider";
import ReadingListCard from "./ReadingListCard";
import { MdOutlineClose } from "react-icons/md";

function ReadingList({ modalIsOpen, setModalIsOpen }) {
  const { readingList } = useContext(readingListContext);

  return (
    <section
      className={`flex flex-col gap-2 items-center shadow-black/50 shadow-inner bg-slate-800/20 rounded-lg transition-all duration-200 fixed left-[65%] overflow-y-auto md:py-6 md:px-2 md:mt-6 md:mr-6 md:w-[30%] bottom-6 top-20 max-md:top-0 max-md:bottom-0 max-md:right-0 max-md:z-50 max-md:backdrop-blur-lg ${
        modalIsOpen
          ? "max-md:left-0 max-md:right-0"
          : " max-md:left-full max-md:overflow-hidden max-md:opacity-0"
      }`}
    >
      <button
        onClick={() => setModalIsOpen((prev) => !prev)}
        className="text-3xl absolute right-4 top-2 hover:text-red-600 transition-colors ease-in cursor-pointer md:hidden"
      >
        <MdOutlineClose />
      </button>
      <h3 className="text-3xl max-md:pt-8 text-center">Lista de Lectura</h3>
      <hr className="w-[60%] opacity-30" />
      {readingList.length > 0 ? (
        <>
          <ul className="grid max-md:grid-cols-2 lg:grid-cols-2 2xl:flex 2xl:flex-wrap p-4 gap-8 mt-8">
            {readingList.map((book) => (
              <ReadingListCard key={book.ISBN} book={book} />
            ))}
          </ul>
        </>
      ) : (
        <h4 className="text-lg my-auto px-8">
          Aún no has agregado ningún libro a tu lista. <br />
          ¿Qué esperas? <br />
          <span className="text-3xl text-sky-600">Comienza a leer hoy!</span>
        </h4>
      )}
    </section>
  );
}

export default ReadingList;
