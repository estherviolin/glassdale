// //function to convert single note obj into HTML
export const NoteHTMLConverter = (noteObj, relatedCriminal) => {
    return `
            <section class="note">
            <h3 class="note--timestamp">Date:${ new Date(noteObj.timestamp).toLocaleDateString('en-US')}</h3>
            <div class="note--title"> Title: ${noteObj.title}</div>
            <div class="note--author"> Author: ${noteObj.author}</div>
            <div class="note--suspect"> Suspect: ${relatedCriminal.name}</div>
            <div class="note--content"> Entry: ${noteObj.content}</div>
            <button id="deleteNote--${noteObj.id}">Delete</button>
            <button id="edit--${noteObj.id}">Edit</button>
                        
         
        </section>
        `
}
