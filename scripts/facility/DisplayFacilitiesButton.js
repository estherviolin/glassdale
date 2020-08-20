
const contentTarget = document.querySelector(".facility__button")
const eventHub = document.querySelector(".container")
const hideFacilityTarget = document.querySelector(".hideFacilityButton")



export const FacilityButton = () => {
    contentTarget.innerHTML = `
    <button class="displayFacilities" id="displayFacilities">List Facilities</button>
    `
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "displayFacilities") {
        contentTarget.innerHTML = ''
        const facilityClickedEvent = new CustomEvent("facilitiesButtonClicked")
        eventHub.dispatchEvent(facilityClickedEvent)
        HideFacilitiesButton()
}
})

const HideFacilitiesButton = () => {
    hideFacilityTarget.innerHTML = `
    <button id="hideFacilities">Hide Facilities</button>
    `
}

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "hideFacilities") {
        hideFacilityTarget.innerHTML = ``
        const HideFacilitiesClicked = new CustomEvent("hideFacilitiesClicked")
        eventHub.dispatchEvent(HideFacilitiesClicked)

    }
})
