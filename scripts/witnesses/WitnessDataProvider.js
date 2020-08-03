//new array for fetched data
let witnesses = []

//makes a copy of criminals array
export const useWitnesses = () => witnesses.slice()

export const getWitnesses = () => {
    /*
        Load database state into application state with a fetch().
        Make sure the last then() updates the criminals array
    */

    return fetch("https://criminals.glassdale.us/witnesses")
        .then(response => response.json())
        .then(
            parsedWitnesses => {
                witnesses = parsedWitnesses
            }
        )
        
            
}
