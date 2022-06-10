import { useState } from 'react'

export const PersonForm = ({addContact}) =>{

  const [newContactName, setContactName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleContactNameChange = (event) => {
    setContactName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newContact = {
      name: newContactName,
      number: newPhoneNumber
    }

    addContact(newContact)

    setContactName("")
    setNewPhoneNumber("")
  }

  return(
    <form onSubmit={handleSubmit}>
      <div>
        name: <input type="text" 
            onChange={handleContactNameChange} 
            value={newContactName}/>
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