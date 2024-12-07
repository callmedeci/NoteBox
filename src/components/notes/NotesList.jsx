import PropTypes from "prop-types";
import Note from "./Note";

export default function NotesList({
  notes,
  onRemove,
  activeNote,
  setActiveNote,
  setIsNewNoteOpen,
  setIsOpenNoteColor,
}) {
  function handleSetActive(id) {
    setIsNewNoteOpen(false);
    setIsOpenNoteColor(false);
    setActiveNote((active) => (id === active ? null : id));
  }

  return (
    <>
      {notes.map((note) => (
        <Note
          note={note}
          key={note.id}
          isActive={note.id === activeNote}
          onRemove={onRemove}
          onToggle={() => handleSetActive(note.id)}
        />
      ))}
    </>
  );
}

NotesList.propTypes = {
  notes: PropTypes.array,
  onRemove: PropTypes.func,
  activeNote: PropTypes.string,
  setActiveNote: PropTypes.func,
  setIsNewNoteOpen: PropTypes.func,
  setIsOpenNoteColor: PropTypes.func,
};
