import React from 'react'

const Country = ({data, search}) => {

    const filtered = data.filter(d => {
        return d.name.toLowerCase().includes(search.toLowerCase())
    })
    const printOut = () => {
        const length = filtered.length
        if (search === '') {
            return <div></div>
        }
        if (length > 10) {
            return <p>Too many matches, specify another filter</p>
        }
        else if (length === 1) {
            return <div>
                        {filtered.map(country => 
                            <div key={country.alpha2Code} >
                                <h2>{country.name}</h2> 
                                <p>Capital: {country.capital}</p>
                                <p>Population: {country.population}</p>
                                <h3>Languages:</h3>
                                <ul>
                                    {country.languages.map((language,i) => <li key={i}>{language.name}</li>)}
                                </ul>
                                <img src={country.flag} width='500' height='400' alt='Country flag'/>
                            </div>)}
                    </div>
        }
        else {
            return <ul>
                        {filtered.map(country => 
                            <li key={country.alpha2Code} >
                                {country.name}
                            </li>)}
                   </ul>

        }
    }
    return ( 
        <div>
            {printOut()}
        </div>
    )
}

export default Country;