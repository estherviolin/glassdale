//module to make HTML list of array of note objects
import {deleteNote, getNotes, useNotes} from "./NoteDataProvider.js"
import { NoteHTMLConverter } from "./NoteHTMLConverter.js"
import { HideNoteButton } from "./HideNotes.js"
import { ShowNoteButton } from "./NoteButton.js"
import {useCriminals} from "../criminals/CriminalProvider.js"

const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

//adding event listener to eventhub for when show notes button is clicked
eventHub.addEventListener("showNotesClicked", noteButtonClicked => {
    NoteList()
    //also render hidenotes button
    HideNoteButton()
})

//listen for change to app state and update HTML rendering
eventHub.addEventListener("noteStateChanged", () => {
    const newNotes = useNotes()
    render(newNotes)
    
})

//listen for hide note button to be clicked
eventHub.addEventListener("hideNotesClicked", hideButtonClicked => {
    ShowNoteButton()
    contentTarget.innerHTML = `
    `

})

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("deleteNote--")) {
        const [prefix, id] = clickEvent.target.id.split("--")

        /*
            Invoke the function that performs the delete operation.

            Once the operation is complete you should THEN invoke
            useNotes() and render the note list again.
        */
       deleteNote(id)
       //unnecesary now because of note state changed event
            // .then(
    //        () => {
    //            const updatedNotes = useNotes()
    //            const criminals = useCriminals()
    //            render(updatedNotes, criminals)
    //        }
    //    )
    }
})

//function to get and render notes as HTML
export const NoteList = () => {
    getNotes() //from the API
        .then(() => {
            const allNotes = useNotes() //array of notes
            render(allNotes) //render to the DOM
        })
}

//render function
const render = (noteArray) => {
    const criminals = useCriminals()
    //loop through note array and convert each obj to HTML
    const allNotesAsHTML = noteArray.reverse().map(
        (noteObj) => {
            const relatedCriminal = criminals.find(criminal => criminal.id === noteObj.criminalId)
            return NoteHTMLConverter(noteObj, relatedCriminal)
          }
    ).join("") //get rid of commas
    

    contentTarget.innerHTML = allNotesAsHTML //update the DOM
}

