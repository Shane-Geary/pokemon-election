import { useState } from 'react';
import './Grid.css'
import { useQuery } from "react-query"
import CurrentWinner from './CurrentWinner';
import {AwesomeButton, AwesomeButtonProgress} from 'react-awesome-button';
// import AwesomeButtonStyles from "react-awesome-button/src/styles/styles.scss";
import "react-awesome-button/dist/styles.css";

function PokeGrid() {

    const [shinySprite, setShinySprite] = useState(false)

    const [pokeDropped, setPokeDropped] = useState(false)

    const [pokeMember, setPokeMember] = useState([])

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

    const handleDragStart = (e, pokemon) => {
        console.log('dragstart div: ', pokemon)
        e.dataTransfer.setData('draggedPoke', pokemon)
        setPokeMember(pokemon)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handleDrop = (e, pokemon) => {
        console.log(e)
        setPokeDropped(true)
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
                {/* <button onClick={() => console.log(data)}>DATA</button> */}
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
                                <div 
                                className='poke-card'
                                draggable
                                onDragStart={(e) => handleDragStart(e, pokemon)}
                                onClick={(e) => {
                                    
                                }}
                                >
                                    <PokemonTile 
                                    {...pokemon} 
                                    />
                                </div>
                            </div>
                        ))}
                        </div>
                </div>
                 <div className='box2'>
                    <div className='shiny-btn-box'>
                        {shinySprite ?
                        <AwesomeButton
                        className='awesome-button'
                        type='secondary'
                        size='medium'
                        onPress={async() => {
                            toggleShinySprite()
                        }}
                        >
                            ORIGINAL
                        </AwesomeButton>
                        :
                        <AwesomeButton 
                        className='awesome-button'
                        type='secondary'
                        size='medium'
                        onPress={async() => {
                            toggleShinySprite()
                        }}
                        >
                            SHINY
                        </AwesomeButton>
                        }
                    </div>
                    <div 
                    className='drawer-wrapper'
                    onDragOver={(e) => {
                        console.log('Dragged')
                        handleDragOver(e)
                    }}
                    onDrop={(e) => {
                        handleDrop(e)
                        console.log(pokeMember)
                    }}
                    >
                        <div>
                            Welcome!
                        </div>
                        {pokeDropped ?
                        <div>
                            Poke1: {pokeMember.name}
                        </div>
                        : null 
                        }
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default PokeGrid