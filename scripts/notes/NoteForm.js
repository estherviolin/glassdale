import { saveNote } from "./NoteDataProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")
        const noteSuspect = document.querySelector("#note--suspect")

        // Make a new object representation of a note
        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            suspect: noteSuspect.value,
            content: noteContent.value,
            timestamp: Date.now()
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

const render = () => {
    contentTarget.innerHTML = `
        <h2 id="note--header">Notes:</h2>
        <input type="text" id="note--title" placeholder="Enter note title" />
        <input type="text" id="note--author" placeholder="Your name here" />
        <input type="test" id="note--suspect" placeholder="Enter suspect involved" />
        <textarea id="note--content" placeholder="Note text here"></textarea>
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}