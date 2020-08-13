import { saveNote, useNotes } from "./NoteDataProvider.js"
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")
        const noteCriminal = document.querySelector("#noteForm--criminal")
       
        const criminalId = parseInt(noteCriminal.value)
           
        if (criminalId !== 0) {

        // Make a new object representation of a note
        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            criminalId: parseInt(noteCriminal.value),
            content: noteContent.value,
            timestamp: Date.now()
        }

        // Change API state and application state
        saveNote(newNote)
    }
    else {
        window.alert("Please select a criminal")
    }
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
                criminals.map(
                    (criminal) => {
                    return `
                    <option value="${criminal.id }">${criminal.name}</option>`

                })
            }

            
        </select>
        <textarea id="note--content" placeholder="Note text here"></textarea>
        <button id="saveNote">Save Note</button>`
}
      
   
    


export const NoteForm = () => {
    getCriminals()
        .then(() => {
            const criminals = useCriminals()
            render(criminals)
        })
    
}