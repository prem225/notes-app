# Notes App 📝

A simple and lightweight **notes application** that lets users create, manage, and store notes right in their browser — using **Local Storage** so your notes _persist between sessions_ without needing a backend. This is based on Florin pop's project.

✨ Supports basic Markdown formatting and timestamped entries.

---

## 🚀 Features

- 🆕 **Add notes** with automatic date & time recording
- 🗑️ **Delete notes** cleanly
- ✍️ **Basic Markdown support** for rich text editing
- 💾 **Local storage persistence** — no server required
- 📅 Notes display with current date/month/year and timestamp

---

## 🛠 Technology Stack

| Layer            | Technology                              |
| ---------------- | --------------------------------------- |
| UI / Frontend    | React                                   |
| Data Persistence | Browser Local Storage                   |
| Formatting       | Basic Markdown formatting (client-side) |

---

## 📦 Getting Started

### Prerequisites

Make sure you have a modern web browser like Chrome, Firefox, Edge, or Safari.

### Run Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/prem225/notes-app.git
   ```

2. **Open the project**
   - Navigate to the project folder
   - Run `npm install` for depedencies
   - Run `npm start`in your cmd, powershell or bash.
   - After Compiled successfully, `ctrl+click` on localhost link

---

## 🧩 How It Works (Quick Overview)

- Notes are stored in the browser’s **Local Storage** under a unique key.
- Each time you add or delete a note, the app updates the localStorage so the changes persist.
- The user interface displays a list of notes with date & time.
- Basic Markdown functions are applied to enrich note text.

---

## 📜 Usage Tips

- Write notes using **simple Markdown** for headings, bold text, lists, etc.
- Reload the page any time — your saved notes will still be there.
- This app doesn’t sync between devices — notes stay in the current browser.

---

## 📬 Feedback & Support

For suggestions or issues, open a GitHub issue or drop a comment in the repo — I’m happy to help!
