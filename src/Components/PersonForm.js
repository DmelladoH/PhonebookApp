export const PersonForm = ({newName, newPhoneNumber, handleNameChange, 
    handlePhoneNumberChange, handlePhonebookSubmit}) =>{

   return(
    <form onSubmit={handlePhonebookSubmit}>
      <div>
        name: <input type="text" 
            onChange={handleNameChange} 
            value={newName}/>
      </div>
      <div>
        phone: <input type="text" 
            onChange={handlePhoneNumberChange} 
            value={newPhoneNumber}/>
      </div>
      <br />
      <div>
        <button type="submit">add</button>
      </div>
    </form>
   )
}