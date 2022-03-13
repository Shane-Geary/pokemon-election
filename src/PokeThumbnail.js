const PokemonThumbnail = ({
    id,
    name,
    image,
    type,
  }) => {

    return (
        <div>
            <div>
                <small>#{id}</small>
            </div>
            <h3>{name.toUpperCase()}</h3>
        </div>
    )
  }

  export default PokemonThumbnail