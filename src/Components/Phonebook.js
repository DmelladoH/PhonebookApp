
import {PersonDisplay} from './PersonDisplay'

export const Phonebook = ({phonebook, filter}) => {

    return(
        <div>
            <ul>
            {
                phonebook.filter((person) => {
                    return person.name.toLowerCase().includes(filter.toLowerCase())
                })
                .map((person) => {
                    return <PersonDisplay 
                        id={person.id}
                        name={person.name}
                        number={person.number}/>
                })}
            </ul>
        </div>
    )
}