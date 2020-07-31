//module to make HTML list of array of note objects
import {getNotes, useNotes} from "./NoteDataProvider.js"
import { NoteHTMLConverter } from "./NoteHTMLConverter.js"
import { HideNoteButton } from "./HideNotes.js"
import { ShowNoteButton } from "./NoteButton.js"

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
    //loop through note array and convert each obj to HTML
    const allNotesAsHTML = noteArray.map(
        (currentNoteObj) => {
            return NoteHTMLConverter(currentNoteObj)
        }
    ).join("") //get rid of commas

    contentTarget.innerHTML = allNotesAsHTML //update the DOM
}

