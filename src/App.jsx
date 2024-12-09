import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import NotesList from "./components/notes/NotesList";
import CreateNoteForm from "./components/notes/CreateNoteForm";
import NoteColorPicker from "./components/notes/NoteColorPicker";
import useLocalStorage from "./hooks/useLocalStorage";
import TypingAnimation from "./components/ui/TypingAnimation ";
import Icon from "./components/ui/Icon";
import UiIcons from "./components/ui/UiIcons";
import Search from "./components/search/Search";
import Sort from "./components/ui/Sort";
import { Button } from "./components/ui/Button";
import { popup } from "./components/ui/Popup";

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
        <section
          style={{ display: "flex", flexFlow: "row wrap" }}
          className={`w-full h-full min-h-96 ${
            !isNewNoteOpen && notes.length < 1
              ? "items-center justify-center"
              : ""
          }`}
        >
          <NotesList
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            setIsNewNoteOpen={setIsNewNoteOpen}
            setIsOpenNoteColor={setIsOpenNoteColor}
            onRemove={handleRemoveNote}
            notes={sortedNotes}
          />
          {!isNewNoteOpen && notes.length < 1 && <TypingAnimation />}

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
            icon={UiIcons.plus("size-5 md:size-6")}
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
