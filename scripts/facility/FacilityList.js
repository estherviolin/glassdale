import { useFacilities, getFacilities } from "./FacilityProvider.js";
import { FacilityHTMLConverter } from "./Facility.js";
import { getCriminalFacilities, useCriminalFacilities } from "./CriminalFacilityProvider.js";
import { getCriminals, useCriminals } from "../criminals/CriminalProvider.js";
import { CriminalList } from "../criminals/CriminalList.js";

const contentTarget = document.querySelector(".criminalsContainer") //because witness statements will take the place of the criminal list
const eventHub = document.querySelector(".container")
const hideFacilityTarget = document.querySelector(".hideFacilityButton")
const showFacilityTarget = document.querySelector(".facility__button")

let facilities = []
let criminals = []
let criminalFacilities = []

export const FacilityList = () => {
    getFacilities()
        .then(getCriminalFacilities)
        .then(getCriminals)
        .then(() => {
            facilities = useFacilities()
            criminals = useCriminals()
            criminalFacilities = useCriminalFacilities()
            render()
        })
}

const render = () => {
    let facilityHTMLReps = ""
            facilities.map(facilityObj => {

                const cfRelationships = criminalFacilities.filter(cf => cf.facilityId === facilityObj.id)

                const matchingCriminals = cfRelationships.map(
                    (currentRelationship) => {
                        return criminals.find(criminal => criminal.id === currentRelationship.criminalId)

                    }
                )
                facilityHTMLReps += FacilityHTMLConverter(facilityObj, matchingCriminals)
            })

            contentTarget.innerHTML = `
            <h2>Facilities:</h2>
            <div class="facilityList">
           
            ${facilityHTMLReps}
            </div>
           
            `
        
    }
  
eventHub.addEventListener("facilitiesButtonClicked", facilityClickedEvent => {
    FacilityList()
})


