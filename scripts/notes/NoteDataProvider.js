//array to be filled w notes
let notes = []

const eventHub = document.querySelector(".container")

//function to dispatch change event that app state changed
const dispatchStateChangeEvent = () => {
    const noteStateChangedEvent = new CustomEvent("noteStateChanged")
    eventHub.dispatchEvent(noteStateChangedEvent)
}

//function to make a copy of notes array
export const useNotes = () => {
    return notes.slice()
}

//function to get notes from API
export const getNotes = () => {
    return fetch("http://localhost:8088/notes")
        //turn it into JSON
        .then(response => response.json())
        .then(parsedNotes => {
            notes = parsedNotes
        })
}

//function to edit a note
export const editNote = (noteObj) => {
    return fetch(`http://localhost:8088/notes/${noteObj.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(noteObj)
    })
    .then(getNotes)
    .then(dispatchStateChangeEvent)
        
}

export const deleteNote = noteId => {
    return fetch(`http://localhost:8088/notes/${noteId}`, {
        method: "DELETE"
    })
    //don't need response => on delete operation
        .then(getNotes)
        .then(dispatchStateChangeEvent)
}

//function to save note after entered into form
export const saveNote = (noteObj) => {
    const jsonNote = JSON.stringify(noteObj) //turn object into string/strings

    return fetch("http://localhost:8088/notes", {
        method: "POST", //send it back to API?
        //what is this object?
        headers: {
            "Content-Type": "application/json"
        },
        body: jsonNote //body is the stringified object
    })
    .then(getNotes) //get updated data from the API
    .then(dispatchStateChangeEvent) //event that says app state was changed
}