export const CriminalHTMLConverter = (criminalObj, facilities) => {
    return `
        <section class ="criminalBox">
            <h3>${criminalObj.name}</h3>            
            <div>Age: ${criminalObj.age}</div>           
            <div>Crime: ${criminalObj.conviction}</div>
            <div>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
            <div>Term end: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</div>
            <div>
                <h2>Facilities</h2>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            <button id="associates--${criminalObj.id}">Associate Alibis</button>
            <dialog class="alibiDialog--${criminalObj.id}">
            
            ${
                criminalObj.known_associates.map(
                    obj => {
                    return `<div>Name: ${obj.name}</div>
                            <div>Alibi: ${obj.alibi}</div>`
    
                    }).join("")
                }
                <button id = "closeAssociates">Close</button>
            </dialog>
        </section>`
            }
