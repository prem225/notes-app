import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Note from "./component/Note";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    if (!saved) return [];
    return JSON.parse(saved).map((n) => ({
      ...n,
      text: typeof n.text === "string" ? n.text : "",
    }));
  });

  const textareaRefs = useRef({});

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // 🔒 stable callback
  const updateNoteText = useCallback((id, value) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: value } : n)),
    );
  }, []);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNote = () => {
    const dateTime = new Date();
    const id = dateTime.getTime();

    const newNote = {
      id,
      date: dateTime.getDate(),
      month: monthNames[dateTime.getMonth()],
      year: dateTime.getFullYear(),
      hours: String(dateTime.getHours()).padStart(2, "0"),
      minutes: String(dateTime.getMinutes()).padStart(2, "0"),
      seconds: String(dateTime.getSeconds()).padStart(2, "0"),
      text: "",
    };

    setNotes((prev) => [...prev, newNote]);

    // focus once, after mount
    setTimeout(() => {
      textareaRefs.current[id]?.focus();
    }, 0);
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="container">
      <div className="title-container">
        <p className="title">Notes App</p>
        <button className="add-note" onClick={addNote}>
          +
        </button>
      </div>

      <p>Click '+' icon for a new note</p>

      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          onUpdate={updateNoteText}
          onDelete={deleteNote}
          textareaRef={(el) => (textareaRefs.current[note.id] = el)}
        />
      ))}
    </div>
  );
}

export default App;
