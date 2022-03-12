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
      <div className='structure-flex'>
        <div className='box1'>
          <PokemonGrid/>
        </div>
        <div className='box2'>
          <CurrentWinner/>
        </div>
      </div>
    </div>
  )
}

export default App
