"use strict";

// ======================================================
// SELECT ELEMENTS
// ======================================================

const notesCount = document.getElementById("notesCount");
const noteInput = document.getElementById("noteInput");

const clearBtn = document.getElementById("clearBtn");
const addNoteBtn = document.getElementById("addNoteBtn");

const notesContainer = document.getElementById("notesContainer");
const emptyState = document.getElementById("emptyState");

// ======================================================
// NOTES ARRAY
// ======================================================

let notes = [];

// ======================================================
// CREATE NOTE FUNCTION
// ======================================================

function createNote(text) {
  const note = {
    id: Date.now(),
    text: text,
    date: new Date().toLocaleDateString(),
  };

  notes.push(note);

  renderNotes();
  saveNotes();
}

// ======================================================
// RENDER NOTES FUNCTION
// ======================================================

function renderNotes() {
  notesContainer.innerHTML = "";

  if (notes.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  notes.forEach((note) => {
    const card = document.createElement("div");

    card.classList.add("note-card");

    card.innerHTML = `
    <p>${note.text}</p>

      <div class="note-footer">

    <span class="note-date">
      ${note.date}
    </span>

    <div class="note-actions">

      <button
        class="edit-btn"
        onclick="editNote(${note.id})"
      >
        Edit
      </button>

      <button
        class="delete-btn"
        onclick="deleteNote(${note.id})"
      >
        Delete
      </button>

    </div>

  </div>
    `;

    notesContainer.appendChild(card);
  });

  notesCount.textContent = notes.length;
}

// ======================================================
// EDIT NOTE FUNCTION
// ======================================================

function editNote(id) {
  const note = notes.find((n) => n.id === id);

  const newText = prompt("Edit note:", note.text);

  if (newText === null) return;

  const trimmed = newText.trim();

  if (trimmed === "") return;

  note.text = trimmed;

  renderNotes();
  saveNotes();
}

// ======================================================
// DELETE NOTE FUNCTION
// ======================================================

function deleteNote(id) {
  notes = notes.filter((note) => {
    return note.id !== id;
  });

  renderNotes();
  saveNotes();
}

// ======================================================
// SAVE NOTES FUNCTION
// ======================================================

function saveNotes() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

// ======================================================
// LOAD NOTES FUNCTION
// ======================================================

function loadNotes() {
  const savedNotes = localStorage.getItem("notes");

  if (savedNotes) {
    notes = JSON.parse(savedNotes);
  } else {
    notes = [];
  }

  renderNotes();
}

// ======================================================
// ADD BUTTON CLICK
// ======================================================

function handleAddNote() {
  const value = noteInput.value.trim();

  if (value === "") return;

  createNote(value);
  noteInput.value = "";
  noteInput.focus();
}

addNoteBtn.addEventListener("click", handleAddNote);

noteInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleAddNote();
  }
});

// ======================================================
// CLEAR BUTTON CLICK
// ======================================================

clearBtn.addEventListener("click", () => {
  noteInput.value = "";
  noteInput.focus();
});

// ======================================================
// LOAD NOTES ON START
// ======================================================

loadNotes();
