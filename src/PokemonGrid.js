import { useState, useEffect } from 'react'
import './Grid.css'

function PokemonGrid() {

    const [pokedex, setPokedex] = useState([])

    const [loadPokemon, setLoadPokemon] = useState(
        'https://pokeapi.co/api/v2/pokemon?limit=20'
    )

    const getAllPokemons = async () => {
        const res = await fetch(loadPokemon);
        const data = await res.json();
        setPokedex(data.next);
        console.log(pokedex)
      
      }

    useEffect(() => {
       getAllPokemons()
    }, [])

    return (
        <div className='grid-wrapper'>
            <div className='id1'>
                <div>
                    
                </div>
            </div>
        </div>
    )
}

export default PokemonGrid