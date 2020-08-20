import {useCriminals, getCriminals} from "./CriminalProvider.js";
import {CriminalHTMLConverter} from "./CriminalHTMLConverter.js";
import {useConvictions} from "../convictions/ConvictionProvider.js"
import { AlibiButton } from "./AlibiButton.js";
import { HideWitnessButton, WitnessButton } from "../witnesses/WitnessStatements.js";
import {WitnessStatementList} from "../witnesses/WitnessList.js"
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

//state variables
let criminals = []
let criminalFacilities = []
let facilities = []
const chosenFilters = {
    crime: "0",
    officer: "0"
}

export const CriminalList = () => {  
    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {
            criminals = useCriminals()
            facilities = useFacilities()
            criminalFacilities = useCriminalFacilities()
            render() 
        })
        .then(AlibiButton)
}
        
        //add two more event listeners (witness and hide)
eventHub.addEventListener("WitnessStatementsClicked", WitnessStatementsClicked => {
        let WitnessStatements = WitnessStatementList()
            contentTarget.innerHTML = `
            ${WitnessStatements}
            `
    })
eventHub.addEventListener("HideButtonClicked", HideClicked => {
        WitnessButton()
        const criminalArray = useCriminals()
        render(criminalArray)

    })       
       

//listens for custom event
eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    console.log("CriminalList: custom crimeSelected event heard on event hub")
    //filter displayed criminals by the crime that was chosen

    //which crime was chosen
    chosenFilters.crime = crimeSelectedEvent.detail.crimeId

    filteredCriminals()
    render()
})
    //filter criminal array to only those with matching 'conviction' property value
const filteredCriminals = () => {
        criminals = useCriminals()
        const arrayOfCrimes = useConvictions()

        if (chosenFilters.crime !== "0") {
            const foundCrimeObject = arrayOfCrimes.find(
                (crimeObj) => {
                    return parseInt(chosenFilters.crime) === crimeObj.id
                }
            )
            criminals = criminals.filter(currentCriminalObj => currentCriminalObj.conviction === foundCrimeObject.name)
        }
        if (chosenFilters.officer !== "0") {
            criminals = criminals.filter(currentCriminalObj => currentCriminalObj.arrestingOfficer === chosenFilters.officer)
        }
}

//listens for custom event
eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {
    console.log("CriminalList: custom officerSelected event heard on event hub")
  
    chosenFilters.officer = officerSelectedEvent.detail.officer
    filteredCriminals()
    render()
  
    
})

//function to render to DOM
const render = () => {
    console.log("CriminalList: Rendered to DOM")
    let criminalHTMLReps = ""
    criminals.map(criminal => {

        const cfRelationships = criminalFacilities.filter(cf => cf.criminalId === criminal.id)

        const matchingFacilities = cfRelationships.map(
            (currentRelationship) => {
                return facilities.find(facility => facility.id === currentRelationship.facilityId)
           
        })
        criminalHTMLReps += CriminalHTMLConverter(criminal, matchingFacilities)
    })
    
    contentTarget.innerHTML = `
    <h2>Glassdale Convicted Criminals</h2>
    <article class="criminalList">
        ${criminalHTMLReps}
    </article>
    `
}


