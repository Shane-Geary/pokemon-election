import { useEffect, useRef, useState } from 'react';
import './Grid.css'

import { useQuery } from "react-query"
// import CurrentWinner from './CurrentWinner';
import {AwesomeButton, AwesomeButtonProgress} from 'react-awesome-button'
import "react-awesome-button/dist/styles.css"
import lottie from 'lottie-web'
import { useDrag } from 'react-dnd';

import PTlogo from './Lotties/PTLogo.json'


function PokeGrid() {

    const container = useRef(null)

    const [shinySprite, setShinySprite] = useState(false)

    // const [pokeDropped, setPokeDropped] = useState(false)

    // const [pokeMember, setPokeMember] = useState([])

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
            <div 
            className={style}
            onMouseEnter={(e) => {
                // e.preventDefault()
                // e.stopPropagation()
            }}
            >
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

      useEffect(() => {
        const delay = setTimeout(() => {
            lottie.loadAnimation({
                container: container.current,
                animationData: PTlogo,
                loop: false,
                autoplay: true
            })
        }, [2000])
        return () => clearTimeout(delay)
      }, [])

      const [{isDragging}, drag] = useDrag(() => ({
          type: 'div',
          collect: (monitor) => ({
              isDragging: !!monitor.isDragging(),
          }),
    }))

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
            <div className='title-wrapper'>
                <div className='title'>
                    {isLoading ?
                    <h1 className='lottie-placeholder'>
                        <div></div>
                    </h1>
                    :
                    <h1>
                        <div 
                            ref={container}
                            // onClick={() => lottie.play()}
                        />
                    </h1>
                    }
                </div>
                <div className='header-line'/>
            </div>
            <div className='background-wrapper'>
                <div className='structure-flex'>
                    <div className='box1'>
                        <div className='grid-wrapper'>
                            {pokemons.map((pokemon) => (
                            <div key={pokemon.name} className='poke-card-wrapper'>
                                <div 
                                style={{ border: isDragging ? '5px dotted lightred' : '0px'}}
                                className='poke-card'
                                // draggable
                                onDragStart={(e) => console.log(pokemon)}
                                
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
                    
                    >
                        <div>
                            Welcome!
                        </div>
                        <div className='poke-member-container'>
                            {/* {pokemons.map()} */}
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default PokeGrid