import ReactMarkdown from "react-markdown";

export function Markdown({
  text,
  isEditing,
  onChange,
  onBlur,
  onClick,
  textareaRef,
}) {
  return (
    <div className="editor-box" onClick={!isEditing ? onClick : undefined}>
      {isEditing ? (
        <textarea
          ref={textareaRef}
          className="text-area"
          value={text}
          autoFocus
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <div className="markdown-preview">
          <ReactMarkdown>
            {text?.trim() ? text : "*Click to write…*"}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
