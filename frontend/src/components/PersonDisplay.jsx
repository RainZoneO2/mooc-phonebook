import Button from "./Button"

const PersonsDisplay = ({persons, deleteHandler}) => {
    return (
      persons.map(person => 
        <p key={person.id}>
          {person.name} {person.number}
          <Button id={person.id} type="button" handleClick={deleteHandler} btnText='Delete'/>
        </p>
      )
    )
}

export default PersonsDisplay