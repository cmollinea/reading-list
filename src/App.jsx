import { useContext, useEffect, useState } from "react";
import { readingListContext } from "./Context/ReadingListProvider";
import books from "./mocks/books.json";
import AvailableBooks from "./Componets/AvailableBooks";
import Header from "./Componets/Header";
import ReadingList from "./Componets/ReadingList";
import { MdList } from "react-icons/md";

export default function App() {
  const { readingList, setReadingList, storedList } =
    useContext(readingListContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    //Revisar si estan en sincronia el localstorage y el estado
    if (readingList !== storedList) {
      setReadingList(storedList);
      return;
    }
  }, [storedList]);

  return (
    <div className="text-slate-300 flex flex-col mx-0 items-center place-content-center">
      <Header />
      <button
        className="bg-sky-600/50 hover:bg-sky-600 text-2xl hover:text-inherit transition-colors text-slate-200/50 p-2 md:hidden fixed z-30 bottom-4 right-4 w-fit rounded-full"
        onClick={() => setModalIsOpen((prev) => !prev)}
      >
        <MdList />
      </button>
      <hr className="opacity-30 mt-6 w-[90%]" />
      <main className="md:flex gap-10 w-full">
        <AvailableBooks books={books.library} />
        <ReadingList
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      </main>
    </div>
  );
}