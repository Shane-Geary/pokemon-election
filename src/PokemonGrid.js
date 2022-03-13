import { useState, useEffect } from 'react'
import './Grid.css'
import { useQuery } from "react-query";
import PokemonThumbnail from './PokeThumbnail'

function PokemonGrid() {

    // const [pokedex, setPokedex] = useState([])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const resp = await fetch(
    //             'https://pokeapi.co/api/v2/pokemon?limit=20'
    //             )
    //         const data = await resp.json()
    //         setPokedex(data.resp)
    //     }
    //     console.log(pokedex)
    //     fetchData()
    // }, [])

    const getPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
        const data = await response.json();
      
        return data;
      };
      
      const getPokemon = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
      
        return data;
      };
      
      const PokemonTile = ({ name, url }) => {
        const { error, isLoading, data } = useQuery(`pokemon${name}`, () =>
          getPokemon(url)
        );
      
        if (error) {
          return <div>Error: {error}</div>;
        }
      
        if (isLoading) {
          return (
            <div>Loading...</div>
          );
        }
      
        const {
          sprites: { front_default }
        } = data;
      
        return (
            <div>
                <img src={front_default} alt={name} />
                <div></div>
            </div>
        );
      };

    return (
        <div>
            <div className='grid-wrapper'>
                <div className='id1'>
                    <div>
                        {/* {pokedex.map(({name, url}) => (
                            <div key={url}>
                                {name}
                            </div>
                        ))} */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PokemonGrid