import { useRef, useState } from 'react'
import { Togglable } from './Togglable'

export const ContactForm = ({addContact}) =>{

  const [newContactName, setContactName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const togglableRef = useRef()

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
    togglableRef.current.changeTogglableVisibility()
  }

  return(
    <Togglable btnMessage ='add Contact' ref ={togglableRef}>
      <h2>Add a new contact</h2>

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
    </Togglable>
  )
}