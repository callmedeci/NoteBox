import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export default function NoteColorPicker({ onSelect }) {
  const [isSelected, setIsSelected] = useState(0);

  const noteColorEl = useRef(null);
  const bgColors = [
    "bg-rose-700",
    "bg-pink-700",
    "bg-purple-700",
    "bg-violet-700",
    "bg-fuchsia-700",
    "bg-emerald-700",
    "bg-green-700",
    "bg-teal-700",
    "bg-cyan-700",
    "bg-indigo-700",
    "bg-blue-800",
    "bg-zinc-700",
    "bg-gray-700",
    "bg-slate-700",
  ];
  const shadowColor = [
    "shadow-rose-700",
    "shadow-pink-700",
    "shadow-purple-700",
    "shadow-violet-700",
    "shadow-fuchsia-700",
    "shadow-emerald-700",
    "shadow-green-700",
    "shadow-teal-700",
    "shadow-cyan-700",
    "shadow-indigo-700",
    "shadow-blue-800",
    "shadow-zinc-700",
    "shadow-gray-700",
    "shadow-slate-700",
  ];

  useEffect(function () {
    noteColorEl.current = document.querySelector("#note-color");

    setTimeout(function () {
      noteColorEl.current.classList.remove("opacity-0", "-translate-x-2");
    }, 0);

    return function () {
      setTimeout(function () {
        noteColorEl.current.classList.add("opacity-0", "-translate-x-2");
      }, 0);
    };
  }, []);

  function selectColor(e, i) {
    setIsSelected(i);
    onSelect(e.target.value);
  }

  return (
    <div
      id="note-color"
      className="flex gap-2 items-center bg-zinc-900/50 rounded-full 
        p-4 opacity-0 -translate-x-2 transition-all duration-300 ease-linear"
    >
      {bgColors.map((color, i) => (
        <button
          key={i}
          value={color}
          className={`w-4 h-4 shadow rounded-full ${color} ${shadowColor[i]} ${
            isSelected === i && "-translate-y-1 shadow-xl"
          } transition-all`}
          onClick={(e) => selectColor(e, i)}
        ></button>
      ))}
    </div>
  );
}

NoteColorPicker.propTypes = {
  onSelect: PropTypes.func,
};
