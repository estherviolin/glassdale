//button that lists witness statements

import { WitnessStatementList } from "./WitnessList.js"
import { CriminalList } from "../criminals/CriminalList.js"


const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".witnessButtonContainer")
const hideButtonTarget = document.querySelector(".hideWitnessButton")

//Witness button that will render on initial page load
export const WitnessButton = () => {
    contentTarget.innerHTML = `
    <button id="witnessStatements">Witness Statements</button>
    `

}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "witnessStatements") {
        contentTarget.innerHTML = ''
        const WitnessStatementsClicked = new CustomEvent("WitnessStatementsClicked")
        eventHub.dispatchEvent(WitnessStatementsClicked)
        HideWitnessButton()
    }
})

export const HideWitnessButton = () => {
    hideButtonTarget.innerHTML = `
    <button id="hideWitnesses">Hide Witness Statements</button>
    `
}
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "hideWitnesses") {
        hideButtonTarget.innerHTML = ''
        const HideClicked = new CustomEvent("HideButtonClicked")
        eventHub.dispatchEvent(HideClicked)
    }
})

//browser generated change event
// export const WitnessStatementsEvent = () => {
//     eventHub.addEventListener("click", (clickEvent) => {
//     if (clickEvent.target.id === "witnessStatements") {  
//         contentTarget.innerHTML = ``
//         WitnessStatementList()
//         HideWitnessButton()
//     }
//     else if (clickEvent.target.id === "hideWitnesses") {
//         hideButtonTarget.innerHTML = ``
//         WitnessButton()
//         CriminalList()
//     }
// })
// }
