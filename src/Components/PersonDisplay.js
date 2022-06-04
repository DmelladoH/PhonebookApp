
export const PersonDisplay = ({id, name, number}) => {
    return <li key={id}> {name} : {number}</li>
}