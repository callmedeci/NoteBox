import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import UiIcons from "../UiIcons";

export default function CreateNoteForm({ onCloseNewNote, onAdd, noteColor }) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(48);

  const formEl = useRef(null);

  const formatedDate = Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date());

  function handleInputLength() {
    const lines = text.split("\n").length;
    const textLength = text.length;
    const lineHeight = 24;
    const minHeight = 50;
    const maxHeight = 300;

    setWidth(Math.min(Math.max(textLength * 10, 200), 500));
    setHeight(Math.min(Math.max(lines * lineHeight, minHeight), maxHeight));
  }

  function handleKeyDown(e) {
    if (e.ctrlKey && e.code === "Enter") formEl.current.requestSubmit();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!text && !title) return;

    const id = Date.now();
    const newNote = {
      date: formatedDate,
      title,
      text,
      id,
      bgColor: noteColor,
    };

    onCloseNewNote();
    onAdd(newNote);
  }

  useEffect(function () {
    formEl.current.focus();
  }, []);

  return (
    <div className="w-max flex flex-col overflow-hidden px-3 py-2 relative">
      <form
        ref={formEl}
        onSubmit={(e) => handleSubmit(e)}
        className={`${noteColor} p-5 flex flex-col gap-5 rounded-xl 
        shadow-xl hover:shadow-2xl transition-all duration-300 
        opacity-95 w-auto text-sm md:text-base`}
      >
        <div className="flex justify-between text-xs sm:text-sm font-open-sans-semibold items-center">
          <span className="flex items-center gap-1">
            {UiIcons.date("size-4 sm:size-6")}
            {formatedDate}
          </span>

          <span>{text.length} characters</span>
        </div>

        <input
          autoFocus
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          className="bg-transparent outline-none 
          placeholder:text-zinc-200 text-zinc-50 text-lg md:text-2xl"
        />

        <textarea
          placeholder="..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          onInput={handleInputLength}
          style={{ width: `${width}px`, height: `${height}px` }}
          className="bg-transparent outline-none w-auto resize-none overflow-hidden text-sm md:text-base"
        ></textarea>

        <button
          type="submit"
          className="focus:bg-black transition-all duration-300 md:hidden"
        >
          Add Note
        </button>
      </form>
    </div>
  );
}

CreateNoteForm.propTypes = {
  onCloseNewNote: PropTypes.func,
  onAdd: PropTypes.func,
  noteColor: PropTypes.string,
};
