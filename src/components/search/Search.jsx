import PropTypes from "prop-types";
import { useRef } from "react";
import useKey from "../../hooks/useKey";

export default function Search({ notes, query, setQuery }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    inputEl.current.focus();
  });

  useKey("Escape", function () {
    inputEl.current.blur();
  });

  return (
    <input
      disabled={notes.length < 1 && true}
      type="text"
      placeholder="Search..."
      value={query}
      ref={inputEl}
      onChange={(e) => setQuery(e.target.value)}
      className="px-5 py-3 rounded-2xl shadow bg-zinc-900/50 outline-none 
        focus:-translate-y-1 focus:shadow-xl transition-all duration-300 
      disabled:placeholder:text-zinc-600
        disabled:opacity-50 w-[60%] md:w-max text-xs sm:text-sm md:text-base"
    />
  );
}

Search.propTypes = {
  notes: PropTypes.array,
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
