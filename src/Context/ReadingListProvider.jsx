import { createContext, useState } from "react";
import useLocalStorage from "use-local-storage";

export const readingListContext = createContext();

export function ReadingListProvider({ children }) {
  const [readingList, setReadingList] = useState(() => {
    const books = localStorage.getItem("readingList");
    if (books) {
      return JSON.parse(books);
    }
    return [];
  });
  const [storedList, setStoredList] = useLocalStorage("readingList", []);

  return (
    <readingListContext.Provider
      value={{ readingList, setReadingList, storedList, setStoredList }}
    >
      {children}
    </readingListContext.Provider>
  );
}
