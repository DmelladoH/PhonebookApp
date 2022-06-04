import { useEffect, useState } from 'react'
import React from 'react';

import {getPhonebook, create} from './Server/restPhonebook'
import {Phonebook} from './Components/Phonebook'
import {SearchFilter} from './Components/SearchFilter'
import {PersonForm} from './Components/PersonForm'

function App() {
  
  const [phonebook, setPhoneBook] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filterPerson, setFilterPerson] = useState('')

  useEffect(() =>{
    getPhonebook().then(response => {
      setPhoneBook(response.data)
    }, [])
  })

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const handlePhonebookSubmit = (event) => {
    event.preventDefault()

    let valid = phonebook.filter((person) => {
      return person.name === newName
    }).length === 0

    if(!valid) {
      alert(`${newName} is already added to the phonebook`)
      setNewName("")
      return
    }

    const newPerson = {
      name: newName,
      number: newPhoneNumber
    }

    create(newPerson)
    setNewName("")
    setNewPhoneNumber("")
  }

  return (
    <div>
    <h1>Phonebook</h1>
    <SearchFilter
      text={'search: '}
      handleFilterChange={handleFilterChange}
      filterValue={filterPerson}/>

    <h2>Add a new contact</h2>
    <PersonForm 
        newName= {newName}
        newPhoneNumber= {newPhoneNumber}
        handleNameChange = {handleNameChange}
        handlePhoneNumberChange = {handlePhoneNumberChange}
        handlePhonebookSubmit = {handlePhonebookSubmit}/>

    <h2>Contacts</h2>
    <Phonebook
      phonebook={phonebook}
      filter= {filterPerson}/>
   </div>
  );
}

export default App;
