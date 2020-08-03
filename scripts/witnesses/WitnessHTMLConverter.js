export const WitnessHTMLConverter = (witnessObj) => {
    return `
    
    <h2>Witness Statements</h2>
    <div> Name: ${witnessObj.name}</div>
    <div> Statements: ${witnessObj.statements}</div>
    `
    
}