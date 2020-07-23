import {useConvictions, getConvictions} from "./ConvictionProvider.js"

const contentTarget = document.querySelector(".filters__crime")

export const ConvictionSelect = () => {
    //get all convictions from application state
    getConvictions()
        .then(() => {
            const convictions = useConvictions()

            render(convictions)

        })
            const render = convictionsCollection => {
                /*
                    Use interpolation here to invoke the map() method on
                    the convictionsCollection to generate the option elements.
                    Look back at the example provided above.
                */
                contentTarget.innerHTML += `
                    <select class="dropdown" id="crimeSelect">
                        <option value="0">Please select a crime...</option>
                        ${
                            convictionsCollection.map(convictionObj => {
                                const conviction = convictionObj.name
                                return `<option>${conviction}</option>`
                            }
                            ).join("")
                        }
                    </select>
                `
}
        

}
        
        ///why is render not defined