import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

const bgColors = [
  "bg-rose-700",
  "bg-violet-700",
  "bg-emerald-700",
  "bg-green-700",
  "bg-cyan-700",
  "bg-blue-800",
  "bg-gray-700",
];
const shadowColor = [
  "shadow-rose-700",
  "shadow-violet-700",
  "shadow-emerald-700",
  "shadow-green-700",
  "shadow-cyan-700",
  "shadow-blue-800",
  "shadow-gray-700",
];

export default function NoteColorPicker({ onSelect }) {
  const [isSelected, setIsSelected] = useState(0);

  const containerEl = useRef(null);

  useEffect(function () {
    setTimeout(function () {
      containerEl.current.classList.remove("opacity-0", "-translate-x-4");
      containerEl.current.classList.add("opacity-100", "-translate-x-1");
    }, 0);
  }, []);

  function selectColor(e, i) {
    setIsSelected(i);
    onSelect(e.target.value);
  }

  return (
    <div
      ref={containerEl}
      className="flex gap-2 items-center bg-zinc-900/50 rounded-full
        p-2 md:p-4 -translate-x-4 opacity-0 transition-all duration-300 ease-linear"
    >
      {bgColors.map((color, i) => (
        <button
          key={i}
          value={color}
          className={`w-3 h-3 md:w-4 md:h-4 shadow rounded-full 
          ${color} 
          ${shadowColor[i]}
          ${isSelected === i && "-translate-y-1 shadow-xl"}
           hover:-translate-y-0.5
           transition-all duration-300`}
          onClick={(e) => selectColor(e, i)}
        ></button>
      ))}
    </div>
  );
}

NoteColorPicker.propTypes = {
  onSelect: PropTypes.func,
};
