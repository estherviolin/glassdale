import { WitnessStatementList } from "./WitnessList.js"

//button that lists witness statements
const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".witnessButtonContainer")

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
