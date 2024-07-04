import Button from "./Button"

const PersonForm = ({handleNameChange, newName, handleNumberChange, newNumber, addNewPerson}) => {
    return (
      <form>
          <div>Name: <input value={newName} onChange={handleNameChange}/></div>
          <div>Number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <Button id="btnAdd" type="submit" handleClick={addNewPerson} btnText='Add'/>
      </form>
    )
}

export default PersonForm