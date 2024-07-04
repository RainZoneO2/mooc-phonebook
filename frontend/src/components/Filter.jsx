const Filter = ({filter, handleFilterChange}) => {
    return (
      <div><strong>
        Filter for: <input value={filter} onChange={handleFilterChange}/>
      </strong></div>
    )
}

export default Filter