export const FacilityHTMLConverter = (facilityObj, matchingCriminals) => {
    return `
    <section class ="facilityBox">
        <h4> ${facilityObj.facilityName}</h4>
        <div> Security Level: ${facilityObj.securityLevel}</div>
        <div> Capacity: ${facilityObj.capacity}</div>
        <h5> Criminals: </h5>
        <ul>
            ${matchingCriminals.map(c => `<li>${c.name}</li>`).join("")}
        </ul>
    </section>
    `
    
}