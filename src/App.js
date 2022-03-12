import './App.css';
import CurrentWinner from './CurrentWinner';

function App() {
  return (
    <div className="App">
      <h1>
        Pokemon Election
      </h1>
      <div className='header-line'>
        <CurrentWinner/>
      </div>
    </div>
  )
}

export default App;
