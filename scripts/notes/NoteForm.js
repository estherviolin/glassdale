import { saveNote } from "./NoteDataProvider.js"
import { useCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")

    eventHub.addEventListener("change", changeEvent => {

        if (changeEvent.target.id === "noteForm--criminal") {
            const [prefix, criminalId] = changeEvent.target.value.split("--")
           
            }

    })

        // Make a new object representation of a note
        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            criminalId: criminalId.value,
            content: noteContent.value,
            timestamp: Date.now()
        }

        // Change API state and application state
        saveNote(newNote)
    }
})

const render = () => {
    const criminals = useCriminals()

    contentTarget.innerHTML = `
        <h2 id="note--header">Notes:</h2>
        <input type="text" id="note--title" placeholder="Enter note title" />
        <input type="text" id="note--author" placeholder="Your name here" />
        <select id="noteForm--criminal" class="criminalSelect">
            <option value="0">Please select a criminal...</option>
            ${
                criminals.map(criminal => {
                    return `
                    <option value="criminal--${criminal.id }">${criminal.name }</option>`

                })
            }


        </select>
        <textarea id="note--content" placeholder="Note text here"></textarea>
        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}