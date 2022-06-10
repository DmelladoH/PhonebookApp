export const LoginForm = ({userName, password, handleUserNameChange, handlePasswordChange, handleLoginSubmit}) => {
    return(

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

    )
}