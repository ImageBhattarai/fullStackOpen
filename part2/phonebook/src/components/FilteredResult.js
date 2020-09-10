import React from 'react';

const FilteredResult = ({persons, filter}) => {
    const filtered = persons.filter(person => 
                            person.name.toLowerCase().includes(filter.toLowerCase()))

    const printOut = () => {
        if (filter === '') {
            return null
        }
        else {
            return (
                <ul>
                    {filtered.map(filter => <li key={filter.id} >{filter.name}: {filter.number}</li>)}
                </ul>
            )
        }
    }

    return (
        printOut()
    )
} 

export default FilteredResult