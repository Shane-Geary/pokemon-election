import './App.css';
import CurrentWinner from './CurrentWinner'
import PokemonGrid from './PokemonGrid';

function App() {
  return (
    <div className="App">
      <h1>
        Pokemon Election
      </h1>
      <div className='header-line'/>
      <div>
        <CurrentWinner/>
      </div>
      <div>
        <PokemonGrid/>
      </div>
    </div>
  )
}

export default App
