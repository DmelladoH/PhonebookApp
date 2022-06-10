import { useEffect, useState } from 'react'
import React from 'react';

import {getPhonebook, createContact, deleteContact, setToken} from './Server/restPhonebook'
import {login} from './Server/login'
import {Phonebook} from './Components/Phonebook'
import {SearchFilter} from './Components/SearchFilter'
import {PersonForm} from './Components/PersonForm'
import {LoginForm} from './Components/LoginForm'
import {Notification} from './Components/Notification'

function App() {
  
  const [phonebook, setPhoneBook] = useState([])
  const [filterPerson, setFilterPerson] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState('')

  useEffect(() =>{
    getPhonebook().then(response => {
      setPhoneBook(response.data)
    }, [])
  })

  useEffect(() =>{
    const loggedUserJSON = window.localStorage.getItem('loggedPhonebookAppUser')

    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }

  }, [])

  const handleFilterChange = (event) => {
    setFilterPerson(event.target.value)
  }

  const logUser = async ({userName, password}) => {
    try{
      const user = await login({userName, password})

      setUser(user)
      
      window.localStorage.setItem('loggedPhonebookAppUser', JSON.stringify(user))
      setToken(user.token)

    }catch(err){
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage('')
      },5000)

      console.log(err)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setToken(user.token)
    window.localStorage.removeItem('loggedPhonebookAppUser')

  }

  const deleteContctFromPhonebook = (id) => {
    deleteContact(id)
  }

  const addContact = (contact) => {

    console.log(contact)
    let valid = phonebook.filter((person) => {
      console.log(person.name)
      return person.name === contact.name
    }).length === 0

    console.log(valid)
    
    if(!valid) {
      alert(`${contact.newName} is already added to the phonebook`)
      return
    }

    createContact(contact)

  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={errorMessage}/>  
      {
   
         user ? 
            <div>
              <h2>Add a new contact</h2>
              <PersonForm 
                  addContact={addContact}/>
            
             <br />
             <br />
              <SearchFilter
                text={'search: '}
                handleFilterChange={handleFilterChange}
                filterValue={filterPerson}/>
                  
              <h2>Contacts</h2>
              <Phonebook
                phonebook={phonebook}
                filter= {filterPerson}
                deleteContact = {deleteContctFromPhonebook}/>
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          : 
            <div>
              <LoginForm 
                  logUser = {logUser}
                  setErrorMessage = {setErrorMessage}/>      
            </div>
        }
     

      
      
   </div>
  );
}

export default App;
