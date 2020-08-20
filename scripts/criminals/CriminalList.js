import {useCriminals, getCriminals} from "./CriminalProvider.js";
import {CriminalHTMLConverter} from "./CriminalHTMLConverter.js";
import {useConvictions} from "../convictions/ConvictionProvider.js"
import { useOfficers } from "../officers/OfficerProvider.js";
import { AlibiButton } from "./AlibiButton.js";
import { HideWitnessButton, WitnessButton } from "../witnesses/WitnessStatements.js";
import {WitnessStatementList} from "../witnesses/WitnessList.js"
import { getFacilities, useFacilities } from "../facility/FacilityProvider.js";
import { getCriminalFacilities, useCriminalFacilities } from "../facility/CriminalFacilityProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

//listens for custom event
eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    console.log("CriminalList: custom crimeSelected event heard on event hub")
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
    const filteredCriminals = allCriminals.filter(
        (criminalObj) => {
            return foundCrimeObject.name === criminalObj.conviction
        }  
        ) //returns array of objects of filtered criminals

        //adds to DOM:
        render(filteredCriminals)
    
})

//listens for custom event
eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {
    console.log("CriminalList: custom officerSelected event heard on event hub")
  
    const officerSelected = officerSelectedEvent.detail.officer


    //filter criminal array to only those with matching 'arrestingOfficer' property value
    const allCriminals = useCriminals()
    const filteredByOfficer = allCriminals.filter(
        (criminalObj) => {
            return officerSelected === criminalObj.arrestingOfficer
        }  
        ) //returns array of objects of filtered criminals

        //adds to DOM:
        render(filteredByOfficer)
    
})

//function to render to DOM
const render = (arrayOfCriminals, allFacilities, allRelationships) => {
    console.log("CriminalList: Rendered to DOM")
    let criminalHTMLReps = ""
    arrayOfCriminals.map(criminal => {

        const facRelationshipForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminal.id)

        const facilities = facRelationshipForThisCriminal.map(cf => {
            const matchingFacilityObj = allFacilities.find(facility => facility.id===cf.facilityId)
            return matchingFacilityObj
        })
        criminalHTMLReps += CriminalHTMLConverter(criminal, facilities)
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
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {
            const criminalArray = useCriminals()
            const facilities = useFacilities()
            const allRelationships = useCriminalFacilities()
            render(criminalArray, facilities, allRelationships) 
        })
        .then(AlibiButton)
    
        
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
       
}
