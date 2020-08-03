export const WitnessHTMLConverter = (witnessObj) => {
    return `
    <section class ="witnessBox">
        <div> Name: ${witnessObj.name}</div>
        <div> Statements: ${witnessObj.statements}</div>
    </section>
    `
    
}