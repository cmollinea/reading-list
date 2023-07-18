import { useMemo, useState } from "react";

function useFilters(setAvailablesBooks, books) {
  const genres = useMemo(
    () => [...new Set(books.map((book) => book.book.genre))],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState({
    pages: 0,
    category: "all",
  });

  const handleGenreFilter = (e) => {
    const filter = e.target.value;
    setSelectedFilter((prev) => ({ ...prev, category: filter }));
    const filteredBooks = books.filter(
      (item) =>
        (item.book.genre === filter || filter === "all") &&
        (selectedFilter.pages === 0
          ? true
          : item.book.pages >= selectedFilter.pages)
    );
    setAvailablesBooks(filteredBooks);
  };

  const handlePagesFilter = (e) => {
    const filter = e.target.value;
    setSelectedFilter((prev) => ({ ...prev, pages: filter }));
    const filteredBooks = books.filter(
      (item) =>
        item.book.pages >= filter &&
        (selectedFilter.category === "all"
          ? true
          : item.book.genre === selectedFilter.category)
    );
    setAvailablesBooks(filteredBooks);
  };

  return { handleGenreFilter, handlePagesFilter, selectedFilter, genres };
}

export default useFilters;
