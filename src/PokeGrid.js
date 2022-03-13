import './Grid.css'
import { useQuery } from "react-query"

function PokeGrid() {

    const getPokemons = async () => {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
        const data = await response.json()
      
        return data
      };
      
      const getPokemon = async (url) => {
        const response = await fetch(url)
        const data = await response.json()
      
        return data
      };
      
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
      
        // const {
        //   sprites: {
        //       other: {
        //           'official-artwork': { front_default }
        //       }
        //   }
        // } = data

        const {
            id: index
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
      
        return (
            <div>
                <div>
                    <small className='poke-id'>id: {index}</small>
                </div>
                <img src={front_default} alt={name} />
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
            <div className='grid-wrapper'>
            {pokemons.map((pokemon) => (
                <div className='poke-card-wrapper'>
                    <div key={pokemon.name} className='poke-card'>
                        <PokemonTile {...pokemon} />
                    </div>
                </div>
            ))}
            </div>
        </div>
    )
}

export default PokeGrid