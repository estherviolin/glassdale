//button that lists witness statements

import { WitnessStatementList } from "./WitnessList.js"


const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".witnessButtonContainer")

//Witness button that will render on initial page load
export const WitnessButton = () => {
    contentTarget.innerHTML = `
    <button id="witnessStatements">Witness Statements</button>
    `

}

//browser generated change event
export const WitnessStatementsEvent = () => {
    eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id === "witnessStatements") {  
        WitnessStatementList()
    }
})
}
