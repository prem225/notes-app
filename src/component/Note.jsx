import { memo } from "react";

const Note = memo(function Note({ note, onUpdate, onDelete, textareaRef }) {
  return (
    <div className="text-area-container">
      <div className="window-options">
        <p className="date-time-text">
          {note.date} {note.month} {note.year}, {note.hours}:{note.minutes}:
          {note.seconds}
        </p>

        <div className="right-action-buttons">
          <button className="edit-button">Edit</button>
          <button className="delete-button" onClick={() => onDelete(note.id)}>
            Del
          </button>
        </div>
      </div>

      <textarea
        className="text-area"
        placeholder="Type something..."
        value={note.text}
        onChange={(e) => onUpdate(note.id, e.target.value)}
        ref={textareaRef}
      />
    </div>
  );
});

export default Note;
