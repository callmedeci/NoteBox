import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import NotesList from "./components/notes/NotesList";
import CreateNoteForm from "./components/notes/CreateNoteForm";
import NoteColorPicker from "./components/notes/NoteColorPicker";
import UiIcons from "./components/UiIcons";
import { Button } from "./components/Button";
import useLocalStorage from "./hooks/useLocalStorage";
import useKey from "./hooks/useKey";
import { popup } from "./components/swal/Popup";
import SortModal from "./components/SortModal";

const popOptions = {
  title: <p>Clear All ?</p>,
  showConfirmButton: true,
  showCancelButton: true,
  showCloseButton: true,
  color: "#e11d48",
  iconColor: "#e11d48",
  iconHtml: UiIcons.delete(),
};

const confirmedOptions = {
  title: <p className="font-open-sans-semibold">Cleared</p>,
  icon: "success",
  isToast: true,
  position: "top-right",
  timer: 3000,
};

export default function App() {
  const [notes, setNotes] = useLocalStorage([], "notes");
  const [filteredNotes, setFilteredNotes] = useState(notes.slice());
  const [query, setQuery] = useState("");
  const [activeNote, setActiveNote] = useState(null);
  const [isNewNoteOpen, setIsNewNoteOpen] = useState(false);
  const [isOpenNoteColor, setIsOpenNoteColor] = useState(false);
  const [selectedNoteColor, setSelectedNoteColor] = useState("bg-rose-700");
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState("date");

  let sortedNotes = [];
  if (sortBy === "date") sortedNotes = filteredNotes;

  if (sortBy === "title")
    sortedNotes = notes.slice().sort((a, b) => a.title.localeCompare(b.title));

  if (sortBy === "text")
    sortedNotes = notes.slice().sort((a, b) => a.text.localeCompare(b.text));

  function handleToggleSortByModal() {
    setIsSortModalOpen((open) => !open);
  }

  function handleSortBy(newSort) {
    setSortBy((sort) => (sort !== newSort ? newSort : "date"));
  }

  function handleToggleNewNote() {
    setActiveNote(null);
    setIsNewNoteOpen((open) => !open);
    setIsOpenNoteColor((open) => !open);
    setSelectedNoteColor("bg-rose-700");
  }

  function handleRemoveNote(id) {
    setNotes((notes) => notes.filter((note) => note.id !== id));
  }

  function handleAddNote(newNote) {
    setNotes((notes) => [...notes, newNote]);
  }

  function handleRemoveAllNotes() {
    popup(popOptions).then((res) => {
      if (res.isConfirmed) {
        popup(confirmedOptions);
        setNotes([]);
      }
    });
  }

  function handleSelectNoteColor(color) {
    setSelectedNoteColor(color);
  }

  useEffect(
    function () {
      const queryResult = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.text.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(queryResult);
    },
    [notes, query, setFilteredNotes]
  );

  return (
    <section className="w-full min-h-dvh relative flex flex-col">
      <Header>
        <Icon />

        <Search query={query} setQuery={setQuery} notes={notes} />

        <Sort
          onSort={handleSortBy}
          onToggle={handleToggleSortByModal}
          isOpen={isSortModalOpen}
        />
      </Header>

      <Main>
        <section style={{ display: "flex", flexFlow: "row wrap" }} className="">
          <NotesList
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            setIsNewNoteOpen={setIsNewNoteOpen}
            setIsOpenNoteColor={setIsOpenNoteColor}
            onRemove={handleRemoveNote}
            notes={sortedNotes}
          />

          {isNewNoteOpen && (
            <CreateNoteForm
              onCloseNewNote={handleToggleNewNote}
              onAdd={handleAddNote}
              noteColor={selectedNoteColor}
            />
          )}
        </section>
      </Main>

      <Footer>
        <div className="flex gap-2">
          <Button
            borderRadius="100px"
            padding="10px"
            onClick={handleToggleNewNote}
            icon={UiIcons.plus()}
          />

          {isOpenNoteColor && (
            <NoteColorPicker onSelect={handleSelectNoteColor} />
          )}
        </div>

        <Button
          disabled={notes.length < 1}
          text="Clear All Notes"
          width="160px"
          height="40px"
          onClick={handleRemoveAllNotes}
        />
      </Footer>
    </section>
  );
}

function Search({ notes, query, setQuery }) {
  const inputEl = useRef(null);

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
      disabled:opacity-50"
    />
  );
}

Search.propTypes = {
  notes: PropTypes.array,
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

function Icon() {
  return (
    <div className="flex items-center gap-1">
      {UiIcons.inbox("size-10 text-rose-700")}
      <span className="font-open-sans-semibold text-lg">Notepad</span>
    </div>
  );
}

function Sort({ onSort, isOpen, onToggle }) {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <Button
        text="SORT BY"
        icon={UiIcons.sort()}
        padding="15px"
        borderRadius="100px"
        onClick={onToggle}
      />

      {isOpen && <SortModal onSort={onSort} />}
    </div>
  );
}
