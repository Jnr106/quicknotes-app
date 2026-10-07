# QuickNotes

QuickNotes is a responsive note-taking web app built with HTML, CSS, and JavaScript. Users can add notes under Personal, Work, or Study, search their notes, and delete individual entries. Notes are saved in the browser using localStorage so they remain after refreshing the page.

## Features

- Add notes with a category and creation date.
- Reject empty notes and notes longer than 200 characters.
- Display validation messages.
- Delete individual notes.
- Search note text without case sensitivity.
- Show a message when no notes match a search.
- Display correct counts for zero, one, and multiple notes.
- Save and restore notes using localStorage.
- Use different border colours for each category.
- Adapt the form layout for phone screens.

## How to run locally

1. Download this repository or clone it using Git.
2. Open the quicknotes-app folder in VS Code.
3. Install the Live Server extension by Ritwick Dey if needed.
4. Right-click index.html and select Open with Live Server.
5. Use the local address opened by Live Server.

No package installation or build command is required.

## What I learned

- How semantic HTML and matching labels make forms easier to understand and use.
- How Flexbox and media queries create responsive layouts.
- How JavaScript stores notes as an array of objects and renders them into the DOM.
- How event listeners handle form submissions, searches, and delete actions.
- How JSON and localStorage preserve data after a refresh.
- How meaningful Git commits record each stage of a project.

## Storage limitations

Notes are stored in one browser on one device. They are not synced to a server or other devices, and clearing the site's browser storage removes them.