import './App.css';
import { useState, useRef } from "react";

function App() {
  const [note, setNote] = useState([]);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const inputRef = useRef({})

  const editNote = (id) => {
    // const copy = note.filter(note => note.id === id);
    // if (copy) {
    //   navigator.clipboard.writeText(copy.value)
    //     .then(() => alert("Note copied!"))
    //     .catch(err => console.error("Failed to copy:", err));
    // }
  }

  const Note = ({ note }) => {
    return (
      <div className='text-area-container' key={note.id}>
        <div className='window-options'>
          <p className='date-time-text'>{note.date} {note.month} {note.year}, {note.hours}:{note.minutes}:{note.seconds}</p>
          <div className='right-action-buttons'>
            <button className='edit-button' title='Edit'>Edit</button>
            <button className='delete-button' title='Delete' onClick={() => DeleteNote(note.id)}>Del</button>
          </div>

        </div>
        <textarea ref={inputRef} className='text-area' placeholder="Type something..." />
      </div >
    )
  }

  const AddNote = () => {
    const dateTime = new Date();
    const newNote = {
      id: dateTime.getTime(),
      date: dateTime.getDate(),
      month: monthNames[dateTime.getMonth()],
      year: dateTime.getFullYear(),
      hours: String(dateTime.getHours()).padStart(2, '0'),
      minutes: String(dateTime.getMinutes()).padStart(2, '0'),
      seconds: String(dateTime.getSeconds()).padStart(2, '0'),
      text: ''
    }
    setNote(prev => [...prev, newNote])
  }

  const DeleteNote = (id) => {
    const deleteNote = note.filter(note => note.id !== id);
    setNote(deleteNote)
  }

  return (

    <div className="container">
      <div className='title-container'>
        <p className='title'>Notes App</p>
        <button className='add-note' title='new-note' onClick={AddNote}>+</button>
      </div>
      <p>Click '+' icon for a new note</p>
      {note.map(note => (
        <Note key={note.id} note={note} />
      ))}
    </div >
  );
}

export default App;
