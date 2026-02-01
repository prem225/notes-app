import { useState, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Note = memo(function Note({ note, onUpdate, onDelete, textareaRef }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="text-area-container">
      <div className="window-options">
        <p className="date-time-text">
          {note.date} {note.month} {note.year}, {note.hours}:{note.minutes}:
          {note.seconds}
        </p>

        <div className="right-action-buttons">
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="delete-button" onClick={() => onDelete(note.id)}>
            Del
          </button>
        </div>
      </div>

      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="text-area"
          value={note.text}
          onChange={(e) => onUpdate(note.id, e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
        />
      ) : (
        /* 👁 PREVIEW MODE */
        <div className="markdown-preview" onClick={() => setIsEditing(true)}>
          {note.text.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {note.text}
            </ReactMarkdown>
          ) : (
            <p className="placeholder">Click to write…</p>
          )}
        </div>
      )}
    </div>
  );
});

export default Note;
