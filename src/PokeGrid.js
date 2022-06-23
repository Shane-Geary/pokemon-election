/* eslint-disable react/no-unescaped-entities */
import {useEffect, useRef, useState} from 'react'
import './Grid.css'

import {useQuery} from 'react-query'
// import CurrentWinner from './CurrentWinner';
import lottie from 'lottie-web'
import {useDrag} from 'react-dnd'
import {useDrop} from 'react-dnd'
import {Modal} from '@mui/material'

import PTlogo from './Lotties/PTLogo.json'
import RightArrow from './images/right-arrows.png'


function PokeGrid() {

	const container = useRef(null)

	const [shinySprite, setShinySprite] = useState(false)

	const [board, setBoard] = useState([])

	const [shinyContainer, setshinyContainer] = useState(false)

	const [maxPokes, setMaxPokes] = useState(false)

	const [modalOpen, setModalOpen] = useState(false)

	const getPokemons = async () => {
		const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
		const data = await response.json()

		return data
	}

	const getPokemon = async (url) => {
		const response = await fetch(url)
		const data = await response.json()

		return data
	}

	const toggleShinySprite = () => {
		setShinySprite(!shinySprite)
	}

	useEffect(() => {
		const delay = setTimeout(() => {
			if(container.current === true) {
				return null
			}
			lottie.loadAnimation({
				container: container.current,
				animationData: PTlogo,
				loop: false,
				autoplay: true
			})
		}, 2000)
		return () => clearTimeout(delay)
	}, [])

	useEffect(() => {
		setTimeout(() => {
			setshinyContainer(true)
		}, 4000)
	})

	useEffect(() => {
		if(board.length > 6) {
			console.log('Max Pokes')
			setMaxPokes(true)
		}
	}, [board.length])

	const [{isOver}, drop] = useDrop(() => ({
		accept: 'DIV',
		drop: (item) => addDivToBoard(item),
		collect: (monitor) => ({isOver: !!monitor.isOver()}),
	}))

	const addDivToBoard = async (name) => {
		// console.log(board.length);

		setBoard((board) => [...board, name])
	}

	const deleteTeam = () => {
		setBoard(board.slice(0, ...board))
		setMaxPokes(false)
	}

	const handleClose = () => {
		setModalOpen(false)
	}


	const PokemonTile = ({name, url}) => {

		const [{isDragging}, drag] = useDrag(() => ({
			type: 'DIV',
			item: {name: name, url: url},
			collect: (monitor) => ({isDragging: !!monitor.isDragging()}),
		}))

		const {error, isLoading, data} = useQuery(`pokemon${name}`, () =>
			getPokemon(url)
		)

		if(error) {
			return <div>Error: {error}</div>
		}

		if(isLoading) {
			return (
				<div>Loading...</div>
			)
		}

		const {id: index} = data

		// eslint-disable-next-line camelcase
		const {sprites: {front_shiny}} = data

		// eslint-disable-next-line camelcase
		const {sprites: {front_default}} = data

		const {types: [{type: {name: type}}]} = data

		const {abilities: [{ability: {name: ability}}]} = data

		const {
			moves: [
				{move: {name: attack}}
			]
		} = data

		const style = `type-styler ${type}`

		return (
			<div
				className={style}
				ref={drag}
				style={{border: isDragging ? '5px dashed red' : '0px'}}
				onDrag={(e) => {
					console.log(front_default)
				}}
				onClick={(e) => {
					console.log(front_default)
				}}
			>
				<div>
					<small className='poke-id'>id: {index}</small>
				</div>
				{shinySprite ?
					<div className='poke-sprite'>
						{/* eslint-disable-next-line camelcase */}
						<img src={front_shiny} alt={name} />
					</div>
					:
					<div className='poke-sprite'>
						{/* eslint-disable-next-line camelcase */}
						<img src={front_default} alt={name} />
					</div>
				}
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
				{/* <button onClick={() => console.log(data)}>DATA</button> */}
			</div>
		)
	}

	const DroppedPoke = ({name, url}) => {

		const {error, isLoading, data} = useQuery(`pokemon${name}`, () =>
			getPokemon(url)
		)

		if(error) {
			return <div>Error: {error}</div>
		}

		if(isLoading) {
			return (
				<div>Loading...</div>
			)
		}

		// eslint-disable-next-line camelcase
		const {sprites: {front_shiny}} = data

		// const {
		//     sprites: { front_default }
		// } = data

		// eslint-disable-next-line camelcase
		const {sprites: {other: {'official-artwork': {front_default}}}} = data

		return (
			<div>
				{shinySprite ?
					<div className='poke-sprite-board'>
						{/* eslint-disable-next-line camelcase */}
						<img src={front_shiny} alt={name} />
					</div>
					:
					<div className='poke-sprite-board'>
						{/* eslint-disable-next-line camelcase */}
						<img src={front_default} alt={name} />
					</div>
				}
			</div>
		)
	}


	const {error, isLoading, data} = useQuery('pokemons', getPokemons)

	if(error) {
		return <div>Error: {error}</div>
	}

	if(isLoading) {
		return (
			<div>Loading...</div>
		)
	}

	const {results: pokemons} = data


	return (
		<div>
			<div className='title-wrapper'>
				<div className='title'>
					{!shinyContainer ?
						<h1 className='lottie-placeholder'>
							<div></div>
						</h1>
						:
						<div className='shiny-toggle'>
							<div className='shiny-toggle-btn'>
								{shinySprite ?
									<div>Normal Poke's</div>
									:
									<div>Shiny Poke's</div>
								}
							</div>
							<img src={RightArrow} alt='Right arrow' />
							<label className='switch'>
								<input type='checkbox'
									onClick={toggleShinySprite}
								/>
								<span className='slider'></span>
							</label>
						</div>
					}
					{isLoading ?
						<h1 className='lottie-placeholder'>
							<div></div>
						</h1>
						:
						<h1>
							<div
								//Lottie
								ref={container}
							/>
						</h1>
					}
				</div>
				<div className='header-line'/>
			</div>
			<div className='background-wrapper'>
				<div className='structure-flex'>
					<div className='box1'>
						<div className='grid-wrapper'>
							{pokemons.map((pokemon) => (
								<div key={pokemon.name} className='poke-card-wrapper'>
									<div
										className='poke-card'
										onDragStart={(e) => {
										}}
									>
										<PokemonTile
											{...pokemon}
										/>
									</div>
								</div>
							))}
						</div>
					</div>
					<div className='box2'>
						<div
							style={{border: isOver ? '10px solid white' : '4px solid'}}
							className='drawer-wrapper'
							ref={drop}
							onDrop={(e) => {
								// handleMaxAdded()
							}}
						>
							<div className='board-title'>
                            Assemble your Team!
							</div>
							{maxPokes ?
								<div className='max-poke-warning'>
									<div className='max-warning-text'>
										{/* eslint-disable-next-line react/no-unescaped-entities */}
                                    The max number of Poke's in a team is 6.
									</div>
									<i className='close-icon'
										onClick={() => {
											setMaxPokes(false)
										}}
									></i>
								</div>
								: null
							}
							{board.length > 0 ?
								<div className='delete-wrapper'>
									<button className='delete-btn'
										onClick={() => setModalOpen(true)}
									>
									</button>
								</div>
								: null
							}
							<Modal
								open={modalOpen}
								onClose={(_, reason) => {
									if(reason !== 'backdropClick') {
										handleClose()
									}
								}}
								aria-labelledby='modal-modal-title'
								// onClose={() => setModalOpen(false)}
								// forwardRef={modalRef}
								sx={{
									top: '20%',
									left: '88%',
									transform: 'translate(-50%, -50%)',
									width: '12vw',
									height: '9vh'
								}}
								BackdropProps={{style: {backgroundColor: 'whitesmoke', borderRadius: '20px'}}}
							>
								<div>
									<div
										style={{
											display: 'flex',
											justifyContent: 'center',
											marginTop: '20px'
										}}
									>
										Delete Current Team?
									</div>
									<button
										style={{
											position: 'absolute',
											top: '55%',
											left: '15%',
											borderRadius: '20px',
											cursor: 'pointer',
											color: 'rgba(255, 0, 0, 0.89)'
										}}
										onClick={() => {
											deleteTeam()
											setModalOpen(false)
										}}
									>
										Delete
									</button>
									<button
										style={{
											position: 'absolute',
											top: '55%',
											left: '60%',
											borderRadius: '20px',
											cursor: 'pointer'
										}}
										onClick={() => setModalOpen(false)}
									>
										Cancel
									</button>
								</div>
							</Modal>
							<div ref={drop} className='poke-member-container'>
								{board.map((pokemon, index) => {
									return (
										<div key={index}>
											{/* {board.length === 2 ? */}
											<div>
												<DroppedPoke {...pokemon} />
											</div>
											{/* :
                                    null
                                    } */}
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

export default PokeGrid