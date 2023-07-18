import useFilters from "../Hooks/useFilters";

export default function Filters({
  setAvailablesBooks,
  availablesBooks,
  books,
}) {
  const { handleGenreFilter, handlePagesFilter, selectedFilter, genres } =
    useFilters(setAvailablesBooks, books);

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-8">
        {" "}
        <div className="grid gap-2">
          <label
            htmlFor="category-select"
            className="text-sm text-center text-slate-200/40"
          >
            Elige un género:
          </label>
          <select
            className="p-2 bg-gray-700 shadow-sm cursor-pointer rounded-xl  text-slate-100/50"
            id="category-select"
            onChange={(e) => handleGenreFilter(e)}
          >
            <option value="all" defaultChecked>
              Todas los géneros
            </option>
            {genres?.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          {" "}
          <label
            htmlFor="max-pages-range"
            className="text-sm text-center text-slate-200/40"
          >
            Mínimo de paginas: {selectedFilter.pages}
          </label>
          <input
            id="max-pages-range"
            type="range"
            step={100}
            min={0}
            max={1200}
            onChange={(e) => handlePagesFilter(e)}
            value={selectedFilter.pages}
          />
        </div>
      </div>
      <p className="text-center opacity-60 font-medium">
        {selectedFilter.category !== "all" && (
          <>
            {availablesBooks.length > 1 ? "Existen " : "Existe "}
            <span className="font-bold text-sky-600">
              {availablesBooks.length}
            </span>{" "}
            {availablesBooks.length > 1 ? "libros " : "libro "} del género{" "}
            <span className="font-bold text-sky-600">
              {selectedFilter.category}
            </span>
            {selectedFilter.pages > 0 && (
              <>{` con ${selectedFilter.pages} páginas como mínimo`}</>
            )}
          </>
        )}
      </p>
    </div>
  );
}
