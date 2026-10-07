// Select the page elements
const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

// Store notes in memory
let notes = [];
let nextId = 1;

// Build the notes list from the array
function render() {
  list.replaceChildren();

  notes.forEach((note) => {
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

    meta.appendChild(categoryLabel);
    meta.appendChild(date);

    li.appendChild(text);
    li.appendChild(meta);
    li.appendChild(deleteButton);

    list.appendChild(li);
  });
}

// Add a note when the form is submitted
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const note = {
    id: nextId,
    text: input.value.trim(),
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  };

  nextId += 1;
  notes.push(note);
  render();

  input.value = "";
  input.focus();
});

// Draw the initial empty list
render();