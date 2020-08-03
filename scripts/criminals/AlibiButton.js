//button that lists associate alibis of the criminal

const eventHub = document.querySelector(".container")

//browser generated change event
export const AlibiButton = () => {
    eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id.startsWith("associates--")) {
        //spit method
        
        const [ prompt, associateId ] = clickEvent.target.id.split("--")
        //returns array of two strings
        
        //interpolate criminalObj id
        const contentTarget = document.querySelector(`.alibiDialog--${associateId}`)
        contentTarget.showModal()
    }
})
}


