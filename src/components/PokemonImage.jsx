import React from 'react'

const PokemonImage = ({currentPokemon, imageStyle}) => {
    return (
        <img
            src={currentPokemon.imageUrl}
            alt="Pokemon"
            style={imageStyle}
        />
    )
}

export default PokemonImage