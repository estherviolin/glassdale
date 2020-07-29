//button to display past notes

const contentTarget = document.querySelector(".noteListButton")
const eventHub = document.querySelector(".container")

//listens for click on showNotesButton
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "showNotes") {
        const noteButtonClicked = new CustomEvent("showNotesClicked")
        eventHub.dispatchEvent(noteButtonClicked)
    }

})

// function to render shownotes button on initial page load
export const ShowNoteButton = () => {
    contentTarget.innerHTML = `
    <button id="showNotes">Show Notes</button>
    `

}