import {useOfficers, getOfficers} from "./OfficerProvider.js"

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")


contentTarget.addEventListener("change", (changeEvent) => {
    
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value
        

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

const render = arrestingOfficerCollection => {

    contentTarget.innerHTML += `
    <select class ="dropdown" id="officerSelect">
        <option value="0">Please select an officer...</option>
        ${
            arrestingOfficerCollection.map(
                officerObj => {
               
                return `<option value="${officerObj.id}">${officerObj.name}</option>`
                }
            ).join("")
            }
    </select>
    
    `
}

export const OfficerSelect = () => {
    //get all officers from application state
    getOfficers()
        .then(() => {
            const officers = useOfficers()

            render(officers)

        })
            
        

}