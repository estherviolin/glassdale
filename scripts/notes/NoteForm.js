import { saveNote, useNotes, editNote } from "./NoteDataProvider.js"
import { useCriminals, getCriminals } from "../criminals/CriminalProvider.js"

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

//listens for edit button click event
eventHub.addEventListener("editClicked", customEvent => {
    const allNotes = useNotes()
    const noteId = customEvent.detail.noteId
    const noteObjToEdit = allNotes.find(noteObj => noteId === noteObj.id)

    const noteTitle = document.querySelector("#note--title")
    const noteAuthor = document.querySelector("#note--author")
    const noteContent = document.querySelector("#note--content")
    const noteCriminal = document.querySelector("#noteForm--criminal")
    const id = document.querySelector("#noteId")

    noteTitle.value = noteObjToEdit.title
    noteAuthor.value = noteObjToEdit.author
    noteContent.value = noteObjToEdit.content
    noteCriminal.value = noteObjToEdit.criminalId
    id.value = parseInt(noteId)
       
})

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")
        const noteCriminal = document.querySelector("#noteForm--criminal")
       
        const criminalId = parseInt(noteCriminal.value)
           
        if (noteTitle.value && noteAuthor.value && noteContent.value && noteCriminal.value) {
            const id = document.querySelector("#noteId")
            if (id.value === "") {

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
    } else {
        const editedNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            criminalId: parseInt(noteCriminal.value),
            content: noteContent.value,
            timestamp: Date.now(),
            id: parseInt(id.value)
        }
        editNote(editedNote)
        id.value=""
    }
    } else {
        window.alert("Fill in all fields!")
    }
}
})


const render = () => {
    const criminals = useCriminals()

    contentTarget.innerHTML = `
        <h2 id="note--header">Notes:</h2>
        <input type="hidden" name="noteId" id="noteId">
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