import { useWitnesses, getWitnesses } from "./WitnessDataProvider.js";
import { WitnessHTMLConverter } from "./WitnessHTMLConverter.js";

const contentTarget = document.querySelector(".criminalsContainer")

export const WitnessStatementList = () => {

    getWitnesses()
        .then(() => {
            const witnessArray = useWitnesses()
            let witnessHTMLReps = ""
            witnessArray.forEach(witnessObj => {
                witnessHTMLReps += WitnessHTMLConverter(witnessObj)
            })

            contentTarget.innerHTML = `
            <h2>Witness Statements:</h2
            <div class="witnessList">
            ${witnessHTMLReps}
            </div>
            `
        })
}