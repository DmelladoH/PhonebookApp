
import { forwardRef, useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'

export const Togglable = forwardRef(({children, btnMessage},ref) => {
    const [visible, setVisible] = useState(false)

    const hiddenWhenVisible = {display: visible ? 'none' : '' }
    const shownWhenVisible = {display: visible ? '' : 'none' }

    const changeTogglableVisibility = () => setVisible(!visible)

    useImperativeHandle(ref, () =>{
        return changeTogglableVisibility
    })

    return(
        <div>
            <div style={shownWhenVisible}>
                {children}
                <div>
                    <button onClick={changeTogglableVisibility}>cancel</button>
                </div>
            </div>

            <div style={hiddenWhenVisible}>
                <button onClick={changeTogglableVisibility}>{btnMessage}</button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
    btnMessage: PropTypes.string.isRequired
}

