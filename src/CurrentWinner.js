import './App.css'

function CurrentWinner() {

    const mostVoted = pokemon.reduce((prev, current) => {
        return (prev.pokemon > current.pokemon) ? prev : current
    })

    return (
        <div className='drawer-wrapper'>
          <div>
              Top Voted
          </div>
          <div>
              {mostVoted}
          </div>
        </div>
    )
}

export default CurrentWinner