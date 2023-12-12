import { useState, useEffect } from "react";
import Tarjeta from "./components/Tarjeta"
import { color } from "./constants/variables"

const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)) }

let personas = [
    {
        nombre: 'Juan',
        apellido: 'Perez',
        edad: 25,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Maria',
        apellido: 'Lopez',
        edad: 30,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Pedro',
        apellido: 'Garcia',
        edad: 35,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Ana',
        apellido: 'Gonzalez',
        edad: 40,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Jose',
        apellido: 'Rodriguez',
        edad: 45,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Luis',
        apellido: 'Martinez',
        edad: 50,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Carlos',
        apellido: 'Hernandez',
        edad: 55,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Miguel',
        apellido: 'Lopez',
        edad: 60,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Ricardo',
        apellido: 'Garcia',
        edad: 65,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Fernando',
        apellido: 'Gonzalez',
        edad: 70,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Jorge',
        apellido: 'Rodriguez',
        edad: 75,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Raul',
        apellido: 'Martinez',
        edad: 80,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Ramon',
        apellido: 'Hernandez',
        edad: 85,
        carrera: 'Ingeniero en sistemas computacionales'
    },
    {
        nombre: 'Rafael',
        apellido: 'Lopez',
        edad: 90,
        carrera: 'Ingeniero en sistemas computacionales'
    },
]

const TestPage = () => {

    const [personasList, setPersonasList] = useState([])
    const [loading, setLoading] = useState(true)

    async function fetchData() {
        setLoading(true)
        await sleep(4000)
        setPersonasList(personas)
        setLoading(false)
    }

    useEffect( () => {
        fetchData()
    }, [])


    if (loading) {
        return(
            <>Loading...</>
        )
    }
    
    return (
        <>
            <div className="flex flex-wrap w-full h-screen bg-rose-200">
                {
                    personasList.map((person, i) =>
                        <Tarjeta
                            color={color}
                            person={person}
                            key={i} />
                    )
                }
            </div>
        </>
    )
}
export default TestPage;

