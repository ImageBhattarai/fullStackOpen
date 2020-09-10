import React from 'react'

const PersonForm = (props) => (
    <form onSubmit={props.addName}>
        <div>
            name: <input value={props.newName} onChange={props.addToName} /><br/>
            number: <input value={props.phone} onChange={props.addPhone} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
)

export default PersonForm;