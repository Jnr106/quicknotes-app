// Select the page elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Load this project's saved notes
const STORAGE_KEY = "quicknotes-app-notes";
let notes = loadNotes();

// Continue IDs from the highest saved ID
let nextId = 1;

for (const note of notes) {
  if (note.id >= nextId) {
    nextId = note.id + 1;
  }
}

function loadNotes() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Rebuild the visible list from the notes array
function render() {
  list.replaceChildren();

  const searchText = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(searchText)
  );

  visibleNotes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const categoryLabel = document.createElement("span");
    categoryLabel.classList.add("category-label");
    categoryLabel.textContent =
      note.category.charAt(0).toUpperCase() + note.category.slice(1);

    const date = document.createElement("span");
    date.textContent = note.createdAt;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteNote(note.id);
    });

    meta.appendChild(categoryLabel);
    meta.appendChild(date);

    li.appendChild(text);
    li.appendChild(meta);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });

  if (searchText !== "" && visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.textContent = "No notes match your search.";
    list.appendChild(message);
  }

  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

// Delete, save, and redraw
function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
  render();
}

// Validate, add, save, and redraw
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  const note = {
    id: nextId,
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  nextId += 1;
  notes.push(note);
  saveNotes();

  errorMessage.textContent = "";
  render();

  input.value = "";
  input.focus();
});

// Filter the displayed notes as the user types
searchInput.addEventListener("input", render);

// Display saved notes when the page loads
render();