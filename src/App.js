import "./App.css";
import { useState, useEffect, useRef } from "react";

// uncontrolled input happens
function App() {
  const [note, setNote] = useState(() => {
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
    "Dec",
  ];

  const updateNoteText = (id, value) => {
    setNote((prev) =>
      prev.map((n) => (n.id === id ? { ...n, text: value } : n)),
    );
    console.log("render");
  };

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(note));
  }, [note]);

  const Note = ({ note }) => {
    return (
      <div className="text-area-container">
        <div className="window-options">
          <p className="date-time-text">
            {note.date} {note.month} {note.year}, {note.hours}:{note.minutes}:
            {note.seconds}
          </p>
          <div className="right-action-buttons">
            <button className="edit-button" title="Edit">
              Edit
            </button>
            <button
              className="delete-button"
              title="Delete"
              onClick={() => DeleteNote(note.id)}
            >
              Del
            </button>
          </div>
        </div>
        <textarea
          className="text-area"
          placeholder="Type something..."
          value={note.text ?? ""}
          onChange={(e) => updateNoteText(note.id, e.target.value)}
          ref={(el) => (textareaRefs.current[note.id] = el)}
        />
      </div>
    );
  };

  const AddNote = () => {
    const dateTime = new Date();
    const newNote = {
      id: dateTime.getTime(),
      date: dateTime.getDate(),
      month: monthNames[dateTime.getMonth()],
      year: dateTime.getFullYear(),
      hours: String(dateTime.getHours()).padStart(2, "0"),
      minutes: String(dateTime.getMinutes()).padStart(2, "0"),
      seconds: String(dateTime.getSeconds()).padStart(2, "0"),
      text: "",
    };
    setNote((prev) => [...prev, newNote]);
    setTimeout(() => {
      textareaRefs.current[newNote.id]?.focus();
    }, 0);
  };

  const DeleteNote = (id) => {
    const deleteNote = note.filter((note) => note.id !== id);
    setNote(deleteNote);
  };

  return (
    <div className="container">
      <div className="title-container">
        <p className="title">Notes App</p>
        <button className="add-note" title="new-note" onClick={AddNote}>
          +
        </button>
      </div>
      <p>Click '+' icon for a new note</p>
      {note.map((note) => (
        <Note key={note.id} note={note} />
      ))}
    </div>
  );
}

export default App;
