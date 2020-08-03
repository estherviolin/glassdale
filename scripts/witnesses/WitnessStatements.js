import { WitnessStatementList } from "./WitnessList.js"

//button that lists witness statements
const eventHub = document.querySelector(".container")

//browser generated change event
export const WitnessStatementsEvent = () => {
    eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "witnessStatements") {
        const contentTarget = document.querySelector(`.criminalsContainer`) 
        const witnessButtonClicked = new CustomEvent("witnessButtonCLicked")    
        eventHub.dispatchEvent(witnessButtonClicked)
        WitnessStatementList()
    }
})
}
