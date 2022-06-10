
export const PersonDisplay = ({id, name, number, deleteContact}) => {

    const handleDeleteOnClick = () => {
        deleteContact(id)
    }

    return (
        <li key={id} >{name} : {number} <button onClick={handleDeleteOnClick}>delete</button></li>
    )
}


