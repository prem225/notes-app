import "./App.css";
import { useState, useEffect, useRef, useCallback } from "react";
import Note from "./component/Note";

// TODO: Need to Lazy up Arrow

function App() {
  const createSampleNote = () => {
    const d = new Date();
    return {
      id: "sample-note",
      date: d.getDate(),
      month: d.toLocaleString("en-US", { month: "short" }),
      year: d.getFullYear(),
      hours: String(d.getHours()).padStart(2, "0"),
      minutes: String(d.getMinutes()).padStart(2, "0"),
      seconds: String(d.getSeconds()).padStart(2, "0"),
      text: `# 📝 Notes App

## Welcome!

- Click **Edit** to start writing
- Supports basic **Markdown** syntax
- Click outside to preview
- Use \`+\` to add new notes

Happy writing ✨`,
      isSample: true,
    };
  };
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    if (!saved || JSON.parse(saved).length === 0) {
      return [createSampleNote()];
    }
    return JSON.parse(saved);
    // return JSON.parse(saved).map((n) => ({
    //   ...n,
    //   text: typeof n.text === "string" ? n.text : "",
    // }));
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

  const updateNoteText = useCallback((id, value) => {
    setNotes((prev) => {
      const withoutSample = prev.some((n) => n.isSample && n.id === id)
        ? prev.filter((n) => !n.isSample)
        : prev;

      return withoutSample.map((n) =>
        n.id === id ? { ...n, text: value, isSample: false } : n,
      );
    });
  });

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNote = () => {
    setNotes((prev) => {
      const clean = prev.filter((n) => !n.isSample);

      const d = new Date();
      return [
        ...clean,
        {
          id: Date.now(),
          date: d.getDate(),
          month: d.toLocaleString("en-US", { month: "short" }),
          year: d.getFullYear(),
          hours: String(d.getHours()).padStart(2, "0"),
          minutes: String(d.getMinutes()).padStart(2, "0"),
          seconds: String(d.getSeconds()).padStart(2, "0"),
          text: "",
        },
      ];
    });
  };

  useEffect(() => {
    const realNotes = notes.filter((n) => !n.isSample);
    localStorage.setItem("notes", JSON.stringify(realNotes));
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
