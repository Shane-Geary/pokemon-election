import { useState } from 'react';
import './Grid.css'
import { useQuery } from "react-query"
import CurrentWinner from './CurrentWinner';

function PokeGrid() {

    const [shinySprite, setShinySprite] = useState(false)

    const getPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150")
        const data = await response.json()
      
        return data
    }
      
    const getPokemon = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
        
        return data
    }

    const toggleShinySprite = () => {
        setShinySprite(!shinySprite)
    }
      
      const PokemonTile = ({ name, url }) => {

        const { error, isLoading, data } = useQuery(`pokemon${name}`, () =>
          getPokemon(url)
        )
      
        if (error) {
          return <div>Error: {error}</div>
        }
      
        if (isLoading) {
          return (
            <div>Loading...</div>
          )
        }

        const {
            id: index
        } = data
      
        const {
          sprites: { front_shiny }
        } = data

        const {
            sprites: { front_default }
        } = data

        const {
            types: [{
                type: { name: type }
            }]
        } = data

        const {
            abilities: [{
                ability: { name: ability }
            }]
        } = data

        const {
            moves: [{
                move: { name: attack }
            }]
        } = data

        const style = `type-styler ${type}`
      
        return (
            <div className={style}>
                <div>
                    <small className='poke-id'>id: {index}</small>
                </div>
                {shinySprite ?
                <div className='poke-sprite'>
                    <img src={front_shiny} alt={name} />
                </div>
                : 
                <div className='poke-sprite'>
                    <img src={front_default} alt={name} />
                </div>
                }
                <div>
                    {name.toUpperCase()}
                </div>
                <div>
                    Type: {type}
                </div>
                <div>
                    Ability: {ability}
                </div>
                {/* <div>
                    Attack: {attack}
                </div> */}
                <button onClick={() => console.log(data)}>DATA</button>
            </div>
        );
      };

      const { error, isLoading, data } = useQuery("pokemons", getPokemons);

      if (error) {
        return <div>Error: {error}</div>
      }
    
      if (isLoading) {
        return (
            <div>Loading...</div>
        )
      }
    
      const { results: pokemons } = data

    return (
        <div>
            <div className='background-wrapper'>
                <div className='structure-flex'>
                    <div className='box1'>
                        <div className='grid-wrapper'>
                            {pokemons.map((pokemon) => (
                            <div key={pokemon.name} className='poke-card-wrapper'>
                                <div className='poke-card'>
                                    <PokemonTile 
                                    {...pokemon} 
                                    
                                    />
                                </div>
                        
                            </div>
                        ))}
                        </div>
                </div>
                 <div className='box2'>
                    <div className='drawer-wrapper'>
                        <div>
                            Welcome!
                        </div>
                        <div>
                            {shinySprite ?
                            <button onClick={toggleShinySprite}>
                                ORIGINAL
                            </button>
                            :
                            <button onClick={toggleShinySprite}>
                                SHINY
                            </button>
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default PokeGrid