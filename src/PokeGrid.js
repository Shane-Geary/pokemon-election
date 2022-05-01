import { useEffect, useRef, useState, useCallback } from 'react';
import './Grid.css'

import { useQuery } from "react-query"
// import CurrentWinner from './CurrentWinner';
import {AwesomeButton} from 'react-awesome-button'
import "react-awesome-button/dist/styles.css"
import lottie from 'lottie-web'
import { useDrag } from 'react-dnd';
import { useDrop } from 'react-dnd';

import PTlogo from './Lotties/PTLogo.json'


function PokeGrid() {

    const container = useRef(null)

    const [shinySprite, setShinySprite] = useState(false)

    const [board, setBoard] = useState([])

    const [maxedPokes, setMaxedPokes] = useState(false)

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

    useEffect(() => {
        const delay = setTimeout(() => {
            if(container.current === true) {
                return null
            }
                lottie.loadAnimation({
                    container: container.current,
                    animationData: PTlogo,
                    loop: false,
                    autoplay: true
                })
        }, [2000])
        return () => clearTimeout(delay)
      }, []) 

      const [{isOver}, drop] = useDrop(() => ({
        accept: 'DIV',
        drop: (item) => addDivToBoard(item),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }))

    const addDivToBoard = async (name) => {
        // console.log(board); 
        
       setBoard((board) => [...board, name])
    }

    const handleMaxAdded = () => {
        
    }

    
    const PokemonTile = ({ name, url }) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: 'DIV',
        item: {name: name, url: url},
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }))

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
        moves: [ 
            {move:{ name: attack }}
        ]
    } = data

    const style = `type-styler ${type}`
    
    return (        
        <div
        className={style}
        ref={drag}
        style={{ border: isDragging ? '5px dashed red' : '0px'}}
        onDrag={(e) => {
            console.log(front_default)
        }}
        onClick={(e) => {
            console.log(front_default)
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
            <div>
                Attack: {attack}
            </div>
            <button onClick={() => console.log(data)}>DATA</button>
        </div>
        );
    };

    const DroppedPoke = ({ name, url }) => {

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
            sprites: { front_shiny }
        } = data
    
        const {
            sprites: { front_default }
        } = data
    
        return (
            <div>
                {shinySprite ?
                <div className='poke-sprite-board'>
                    <img src={front_shiny} alt={name} />
                </div>
                : 
                <div className='poke-sprite-board'>
                    <img src={front_default} alt={name} />
                </div>
                }
            </div>
            )
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
            <div className='title-wrapper'>
                <div className='title'>
                <div className='shiny-toggle'>
                    <div className='shiny-toggle-btn'>
                        Shiny Poke's 
                    </div>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                    {isLoading ?
                    <h1 className='lottie-placeholder'>
                        <div></div>
                    </h1>
                    :
                    <h1>
                        <div 
                        //Lottie
                            ref={container}
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
                                className='poke-card'
                                onDragStart={(e) => {
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
                    style={{border: isOver ? '10px solid white' : '4px solid'}}
                    className='drawer-wrapper'
                    ref={drop}
                    onDrop={(e) => {
                        // handleMaxAdded()
                    }}
                    >
                        <div>
                            Assemble your Team!
                        </div>
                        <div ref={drop} className='poke-member-container'>
                            {board.map((pokemon, index) => {
                                return (
                                    <div>
                                    {/* {board.length === 2 ? */}
                                    <div key={index}>
                                       <DroppedPoke {...pokemon}/>
                                    </div>
                                    {/* : 
                                    null
                                    } */}
                                    </div>
                                )
                            })}                  
                        </div>
                    </div>
                </div>
                </div>
            </div>

        </div>
    )
}

export default PokeGrid