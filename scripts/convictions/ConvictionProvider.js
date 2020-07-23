let convictions = []

//function for copy of array
export const useConvictions = () => convictions.slice()

//function to get convictions from API
export const getConvictions = () => {
    return fetch("https://criminals.glassdale.us/crimes")
        .then(response => response.json())
        .then(
        parsedCrimes => {
            convictions = parsedCrimes
        })
}