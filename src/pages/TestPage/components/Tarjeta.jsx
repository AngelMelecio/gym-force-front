
import React from 'react'

const Tarjeta = ({ person, ...props }) => {


    return (
        <div
            onClick={() => { alert(JSON.stringify(person)) }}
            style={{}}>
            <h2>{person.nombre} {person.apellido}</h2>
            <h3>{person.edad}</h3>
            <h4>{person.carrera}</h4>
        </div>
    )
}

export default Tarjeta