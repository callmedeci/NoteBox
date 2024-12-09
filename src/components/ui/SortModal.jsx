import PropTypes from "prop-types";
import UiIcons from "./UiIcons";
import { useEffect, useRef } from "react";

const sortOptions = ["title", "text", "date"];
export default function SortModal({ onSort }) {
  const modalEl = useRef(null);

  useEffect(function () {
    setTimeout(() =>
      modalEl.current.classList.remove("translate-y-10", "opacity-0")
    );
  }, []);

  return (
    <div
      ref={modalEl}
      className="flex flex-col absolute top-16 translate-y-10 opacity-0
     bg-zinc-900/50 w-full rounded-3xl z-50 shadow-lg overflow-hidden
      transition-all duration-300"
    >
      {sortOptions.map((sort, i) => (
        <button
          className="flex items-center gap-[6px] text-xs sm:text-sm md:text-base font-open-sans-semibold bg-inherit
           hover:bg-zinc-800 hover:text-rose-600 transition-colors duration-300 w-full p-3"
          key={i}
          value={sort}
          onClick={(e) => onSort(e.target?.value)}
        >
          {UiIcons[sort]("size-4 md:size-6")}
          By {sort}
        </button>
      ))}
    </div>
  );
}

SortModal.propTypes = {
  onSort: PropTypes.func,
};
