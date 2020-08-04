//event listener for Alibi Button to be clicked

const eventHub = document.querySelector(".container")

//function that includes event listener
export const AlibiButton = () => {
    eventHub.addEventListener("click", (clickEvent) => {
    if (clickEvent.target.id.startsWith("associates--")) { //if user clicks associates button
        
        //split the target id which is a string, into an array of strings
        const [ prompt, associateId ] = clickEvent.target.id.split("--")
        //returns array of two strings {"associates", associateId}
        
        const contentTarget = document.querySelector(`.alibiDialog--${associateId}`)
        contentTarget.showModal() //show the dialog
    }
    else if (clickEvent.target.id === "closeAssociates") { //if user clicks close button 
        const theDialog = clickEvent.target.parentNode //the parentNode is the dialog element
        theDialog.close() //closes dialog
    }
})
}
       

                            