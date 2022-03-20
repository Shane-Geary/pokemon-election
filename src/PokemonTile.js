import { useEffect, useRef, useState } from "react";
import './App.css'
import { useQuery } from "react-query"
import CurrentWinner from "./CurrentWinner";

const PokemonTile = ({ name, url, getPokemon }) => {

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

    // const {
    //   sprites: {
    //       other: {
    //           'official-artwork': { front_default }
    //       }
    //   }
    // } = data

    const {
        id: index,
        vote: vote
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
            ability: { name: ability },
        }]
    } = data

    const style = `type-styler ${type}`

    return (
        <>
            <div>
                <div className={style}>
                    <div>
                        <small className='poke-id'>id: {index}</small>
                    </div>
                    <div className='poke-sprite'>
                        <img src={front_default} alt={name} />
                    </div>
                    <div>
                        {name.toUpperCase()}
                    </div>
                    <div>
                        Type: {type}
                    </div>
                    <div onClick={() => console.log(data)}>
                        Ability: {ability}
                    </div>
                    {/* <div>
                        Attack: {attack}
                    </div> */}
                
                </div>
            </div>
            {/* <div className="box2">
                <CurrentWinner />
            </div> */}
        </>
        );
};

export default PokemonTile

