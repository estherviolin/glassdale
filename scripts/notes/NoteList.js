//module to make HTML list of array of note objects
import {getNotes, useNotes} from "./NoteDataProvider.js"
// import { NoteHTMLConverter } from "./NoteHTMLConverter.js"
import { HideNoteButton } from "./HideNotes.js"
import { ShowNoteButton } from "./NoteButton.js"
import {useCriminals, getCriminals} from "../criminals/CriminalProvider.js"

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
        .then(getCriminals)
        .then(() => {
            const allNotes = useNotes() //array of notes
            const criminals = useCriminals()
            render(allNotes, criminals) //render to the DOM
        })
}

//render function
const render = (noteArray, criminalArray) => {
    //loop through note array and convert each obj to HTML
    const allNotesAsHTML = noteArray.map(
        (noteObj) => {
            const relatedCriminal = criminalArray.find(criminal => criminal.id === noteObj.criminalId)
            
            return `
            <section class="note">
                <h3 class="note--timestamp">Date:${ new Date(noteObj.timestamp).toLocaleDateString('en-US')}</h3>
                <h3> Note about ${relatedCriminal.name}</h3>
                <div class="note--title"> Title: ${noteObj.title}</div>
                <div class="note--author"> Author: ${noteObj.author}</div>
                <div class="note--suspect"> Suspect: ${noteObj.suspect}</div>
                <div class="note--content"> Entry: ${noteObj.content}</div>
            </section>
            `
        }
    ).join("") //get rid of commas

    contentTarget.innerHTML = allNotesAsHTML //update the DOM
}

