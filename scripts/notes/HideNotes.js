//button to hide past notes

const contentTarget = document.querySelector(".noteListButton")
const eventHub = document.querySelector(".container")

//listens for click on showNotesButton
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "hideNotes") {
        const hideButtonClicked = new CustomEvent("hideNotesClicked")
        eventHub.dispatchEvent(hideButtonClicked)
    }

})

// function to render shownotes button on initial page load
export const HideNoteButton = () => {
    contentTarget.innerHTML = `
    <button id="hideNotes">Hide Notes</button>
    `

}