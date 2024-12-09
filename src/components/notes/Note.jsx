import PropTypes from "prop-types";
import EditNotesPanel from "./EditNotesPanel";
import UiIcons from "../ui/UiIcons";

export default function Note({ note, onToggle, onRemove, isActive }) {
  return (
    <div className="w-max flex flex-col overflow-hidden px-3 py-2 relative">
      <div
        onClick={onToggle}
        className={`${note.bgColor} p-5 flex flex-col gap-2
          rounded-2xl shadow hover:shadow-lg cursor-pointer 
          transition-all duration-300 opacity-95
         ${
           isActive
             ? "-translate-y-2 shadow-xl opacity-100 text-zinc-50"
             : "hover:-translate-y-1 hover:shadow-md"
         }`}
      >
        <div className="flex text-sm font-open-sans-semibold items-center">
          <span className="flex items-center gap-1">
            {UiIcons.date()}
            {note.date}
          </span>
        </div>

        {note.title && (
          <h4 className="font-open-sans-bold text-2xl">{note.title}</h4>
        )}

        <p className="w-full whitespace-pre-line">{note.text}</p>
      </div>
      {isActive && <EditNotesPanel note={note} onRemove={onRemove} />}
    </div>
  );
}

Note.propTypes = {
  note: PropTypes.object,
  isActive: PropTypes.bool,
  onToggle: PropTypes.func,
  onRemove: PropTypes.func,
};
