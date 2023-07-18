import { useContext, useState } from "react";
import { readingListContext } from "../Context/ReadingListProvider";
import AvailableBookCard from "./AvailableBookCard";
import Filters from "./Filters";

function AvailableBooks({ books }) {
  const [availablesBooks, setAvailablesBooks] = useState(books);
  const { readingList } = useContext(readingListContext);

  return (
    <section className="flex flex-col gap-2 items-center md:w-[65%] lg:p-6 mt-6">
      <div className="grid place-content-center gap-2 z-10 sticky top-0 backdrop-blur-xl w-full rounded-b-xl">
        {" "}
        <h3 className="text-3xl text-center">Libros Disponibles</h3>
        <hr className="opacity-30 max-sm:hidden" />
        <p className="text-center mb-6 opacity-60 font-medium">
          <span className="font-bold text-xl text-sky-600">
            {books.length - readingList.length}
          </span>{" "}
          libros esperan por ti 🙂 <br />
          Tienes{" "}
          <span className="font-bold text-xl text-sky-600">
            {readingList.length}
          </span>{" "}
          libros en tu lista de lectura{" "}
          {readingList.length === 0
            ? "😕"
            : readingList.length === books.length
            ? "😎"
            : "🥳"}
        </p>
      </div>
      <Filters
        setAvailablesBooks={setAvailablesBooks}
        books={books}
        availablesBooks={availablesBooks}
      />
      <ul className="flex flex-col mt-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 lg:place-content-start gap-10 mx-4">
        {availablesBooks.map((item) => (
          <AvailableBookCard key={item.book.ISBN} book={item.book} />
        ))}
      </ul>
    </section>
  );
}

export default AvailableBooks;
