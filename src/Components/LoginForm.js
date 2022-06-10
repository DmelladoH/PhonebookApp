import { useState } from 'react'
import { Togglable } from './Togglable'

export const LoginForm = ({logUser, setErrorMessage}) => {
    
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    
    const handlePasswordChange = (event) =>{
        setPassword(event.target.value)
    }
    
    const handleUserNameChange = (event) =>{
        setUserName(event.target.value)
    }

    const handleLoginSubmit = async (event) => {
        event.preventDefault()
        try{
          const useLogin = {
            userName: userName,
            password: password
          }

          await logUser(useLogin)

          setUserName('')
          setPassword('')
        }catch(err){
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage('')
          },5000)
    
          console.log(err)
        }
      }

    return(
      <Togglable btnMessage = 'Show Login'>
          <form onSubmit={handleLoginSubmit}>
              <div>
                  <input
                      type='text'
                      value={userName}
                      name = 'userName'
                      placeholder = 'userName'
                      onChange = {handleUserNameChange}/>
              </div>
              <div>
                  <input
                  type='password'
                  value={password}
                  name = 'password'
                  placeholder = 'password'
                  onChange = {handlePasswordChange}/>
              </div>
              <button>Log in</button>
          </form>
      </Togglable>
    )
}