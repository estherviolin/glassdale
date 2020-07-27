import {useCriminals, getCriminals} from "./CriminalProvider.js";
import {CriminalHTMLConverter} from "./CriminalHTMLConverter.js";
import {useConvictions} from "../convictions/ConvictionProvider.js"



const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

//listens for custom event
eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    //filter displayed criminals by the crime that was chosen

    //which crime was chosen
    const crimeThatWasSelected = crimeSelectedEvent.detail.crimeId

    //get crime name
    const arrayOfCrimes = useConvictions()
    const foundCrimeObject = arrayOfCrimes.find(
        (crimeObj) => {
            return parseInt(crimeThatWasSelected) === crimeObj.id
        }

        //returns object {id: numb, name: "crime"}

)

    //filter criminal array to only those with matching 'conviction' property value
    const allCriminals = useCriminals()

    const filteredCriminals = allCriminals. filter(
        (criminalObj) => {
            return foundCrimeObject.name === criminalObj.conviction
        }  
        ) //returns array of objects of filtered criminals

        //adds to DOM:
        render(filteredCriminals)
    
})

//function to render to DOM
const render = (arrayOfCriminals) => {
    let criminalHTMLReps = ""
    arrayOfCriminals.forEach(criminal => {
        criminalHTMLReps += CriminalHTMLConverter(criminal)
    })
    
    contentTarget.innerHTML = `
    <h2>Glassdale Convicted Criminals</h2>
    <article class="criminalList">
        ${criminalHTMLReps}
    </article>
    `
}

export const CriminalList = () => {
    
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()
            render(criminalArray)
       
        })
}
