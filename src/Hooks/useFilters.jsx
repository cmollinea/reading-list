import { useMemo, useState } from 'react';

const initialState = {
  pages: 0,
  category: 'all',
  title: ''
};

function useFilters(setAvailablesBooks, books) {
  const genres = useMemo(
    () => [...new Set(books.map((book) => book.book.genre))],
    []
  );

  const [selectedFilter, setSelectedFilter] = useState(initialState);

  const handleGenreFilter = (e) => {
    const filter = e.target.value;
    setSelectedFilter((prev) => ({ ...prev, category: filter }));
    const filteredBooks = books.filter(
      (item) =>
        (item.book.genre === filter || filter === 'all') &&
        (selectedFilter.pages === 0
          ? true
          : item.book.pages >= selectedFilter.pages) &&
        (selectedFilter.title === ''
          ? true
          : item.book.title
              .toLowerCase()
              .includes(selectedFilter.title.toLowerCase()))
    );
    setAvailablesBooks(filteredBooks);
  };

  const handlePagesFilter = (e) => {
    const filter = e.target.value;
    setSelectedFilter((prev) => ({ ...prev, pages: filter }));
    const filteredBooks = books.filter(
      (item) =>
        item.book.pages >= filter &&
        (selectedFilter.category === 'all'
          ? true
          : item.book.genre === selectedFilter.category) &&
        (selectedFilter.title === ''
          ? true
          : item.book.title
              .toLowerCase()
              .includes(selectedFilter.title.toLowerCase()))
    );
    setAvailablesBooks(filteredBooks);
  };

  const handleSearchByTitle = (e, ref) => {
    e.preventDefault();
    const filter = ref.current.value;
    setSelectedFilter((prev) => ({ ...prev, title: filter }));
    const filteredBooks = books.filter(
      (item) =>
        item.book.title.toLowerCase().includes(filter.toLowerCase()) &&
        (selectedFilter.category === 'all'
          ? true
          : item.book.genre === selectedFilter.category) &&
        (selectedFilter.pages === 0
          ? true
          : item.book.pages >= selectedFilter.pages)
    );
    setAvailablesBooks(filteredBooks);
  };

  const clearFilters = () => {
    setSelectedFilter(initialState);
    setAvailablesBooks(books);
  };

  return {
    handleGenreFilter,
    handlePagesFilter,
    handleSearchByTitle,
    clearFilters,
    selectedFilter,
    genres
  };
}

export default useFilters;
