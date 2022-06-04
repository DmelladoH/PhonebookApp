export const SearchFilter = ({text, handleFilterChange, filterValue}) => {
    return(
        <form>
            {text}
            <input onChange={handleFilterChange} value={filterValue} />
        </form>
    )
}