import './App.css';
import CurrentWinner from './CurrentWinner'
import PokeGrid from './PokeGrid'

function App() {
  return (
    <div className="App">
      <div className='title-wrapper'>
        <div className='title'>
          <h1>
            Poke Fantasia
          </h1>
        </div>
        <div className='header-line'/>
      </div>
      <PokeGrid />
    </div>
  )
}

export default App
