export const CriminalHTMLConverter = (criminalObj) => {
    return `
        <section class ="criminalBox">
            <h3>${criminalObj.name}</h3>            
            <div>Age: ${criminalObj.age}</div>           
            <div>Crime: ${criminalObj.conviction}</div>
            <div>Term start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
            <div>Term end: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
        </section>
    `
}