import {useOfficers, getOfficers} from "./OfficerProvider.js"

const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")


contentTarget.addEventListener("change", (changeEvent) => {
    
    if (changeEvent.target.id === "officerSelect") {
        console.log("OfficerSelect: user chose officer")
        
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value
        
        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        console.log("OfficerSelect: dispatch custom officerSelected event")
        eventHub.dispatchEvent(customEvent)
    }
})

const render = arrestingOfficerCollection => {
    console.log("OfficerSelect: Officer select rendered to DOM")

    contentTarget.innerHTML += `
    <select class ="dropdown" id="officerSelect">
        <option value="0">Please select an officer...</option>
        ${
            arrestingOfficerCollection.map(
                officerObj => {
               
                return `<option value="${officerObj.name}">${officerObj.name}</option>`
                }
            ).join("")
            }
    </select>
    
    `
}

export const OfficerSelect = () => {
    console.log("OfficerSelect: officer select rendered on initial page load")
    //get all officers from application state
    getOfficers()
        .then(() => {
            const officers = useOfficers()

            render(officers)

        })
            
        

}