import './App.css';
import CurrentWinner from './CurrentWinner'
import PokeGrid from './PokeGrid'

function App() {
  return (
    <div className="App">
        <div className='title'>
          <h1>
            Pokemon Election
          </h1>
        <div className='header-line'/>
      </div>
      <div className='background-wrapper'>
        <div className='structure-flex'>
          <div className='box1'>
            <PokeGrid/>
          </div>
          <div className='box2'>
            <CurrentWinner/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
