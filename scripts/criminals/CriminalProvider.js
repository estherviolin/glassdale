//new array for fetched data
let criminals = []

//makes a copy of criminals array
export const useCriminals = () => criminals.slice()

export const getCriminals = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last then() updates the criminals array
    */

    return fetch("https://criminals.glassdale.us/criminals")
        .then(response => response.json())
        .then(
            parsedCriminals => {
                //how to use map instead?
                for(const criminal of parsedCriminals) {
                console.table(`${criminal.name}
                                ${criminal.age}
                                ${criminal.conviction}
                                ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}`
                    )
                criminals = parsedCriminals
            }
        }
        )
            
}

console.log(criminals)