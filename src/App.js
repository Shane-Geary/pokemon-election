import './App.css'
// import CurrentWinner from './CurrentWinner'
import PokeGrid from './PokeGrid'

import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className='App'>
				<PokeGrid />
			</div>
		</DndProvider>
	)
}

export default App