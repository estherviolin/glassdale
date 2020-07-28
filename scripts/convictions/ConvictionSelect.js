import {useConvictions, getConvictions} from "./ConvictionProvider.js"

const contentTarget = document.querySelector(".filters__crime")
const eventHub = document.querySelector(".container")

//user generates a change event by the browser
contentTarget.addEventListener("change", (changeEvent) => {

    //new event based on what crime list needs?
    const customEvent = new CustomEvent("crimeSelected", {
        detail: {
            crimeId: changeEvent.target.value
        }
    })

    eventHub.dispatchEvent(customEvent)

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
                    //added a value of convictionObj.id
                    return `<option value="${convictionObj.id}">${conviction}</option>`
                }
                ).join("")
            }
        </select>
    `
}


export const ConvictionSelect = () => {
    //get all convictions from application state
    getConvictions()
        .then(() => {
            const convictions = useConvictions()

            render(convictions)

        })
            
        

}
        
 