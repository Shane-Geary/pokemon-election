import './App.css';
// import CurrentWinner from './CurrentWinner'
import PokeGrid from './PokeGrid'
import Lottie from 'react-lottie-player'
import PTlogo from './Lotties/PTLogo.json'

function App() {
  return (
    <div className="App">
      <div className='title-wrapper'>
        <div className='title'>
          <h1>
            <Lottie 
            animationData={PTlogo}
            play
            loop={false}
            />
          </h1>
        </div>
        <div className='header-line'/>
      </div>
      <PokeGrid />
    </div>
  )
}

export default App
