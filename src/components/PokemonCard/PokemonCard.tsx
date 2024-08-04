import { memo, useEffect, useState } from 'react'
import { Pokemon } from 'pokenode-ts'
import { Heart } from 'lucide-react'
import pokeBallIcon from '../../assets/poke_ball_icon.svg'

type PokemonCardProps = {
  pokemon: Pokemon
  onCardClick: (pokemon: Pokemon) => void
  onToggleFavorite: (pokemonId: number) => void
  favoritePokemonIds: number[]
}

function PokemonCard({ pokemon, onCardClick, onToggleFavorite, favoritePokemonIds }: PokemonCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  // Keep an eye on changes to pokemon or favoritePokemonIds
  useEffect(() => {
    const matchingId = favoritePokemonIds.find((id: number) => id === pokemon.id)
    if (matchingId) {
      setIsFavorite(true)
    }
  }, [favoritePokemonIds, pokemon])

  // The artwork for the Pokemon
  let artworkUrl = pokeBallIcon
  const officialArtworkUrl = pokemon.sprites.other?.['official-artwork'].front_default
  if (officialArtworkUrl) {
    artworkUrl = officialArtworkUrl
  }

  function handleOnCardClick() {
    onCardClick(pokemon)
  }

  function handleAddToFavorites() {
    setIsFavorite(!isFavorite)
    onToggleFavorite(pokemon.id)
  }

  return (
    <div
      className={`w-52 h-64 flex justify-center rounded-lg items-center p-1  cursor-pointer drop-shadow-xl group hover:scale-105 ease-in duration-100 hover:drop-shadow-xl ${
        isFavorite ? 'bg-pokemon-red' : 'bg-pokemon-dark-blue'
      }`}
    >
      <div className="flex flex-col items-center rounded-md h-full w-full bg-white">
        <div
          className="w-10 flex items-center justify-center top-3 right-0 absolute cursor-pointer back"
          onClick={handleAddToFavorites}
        >
          <Heart color={isFavorite ? '#fa0000' : '#3b4cca'} />
        </div>
        <div className="py-2 capitalize font-PokemonSolid tracking-widest text-xl antialiased text-pokemon-dark-blue drop-shadow">
          {pokemon.name}
        </div>
        <div
          className="h-full w-full bg-card-background bg-cover justify-center items-center flex rounded-b-md "
          onClick={handleOnCardClick}
        >
          <img
            src={artworkUrl}
            alt={pokemon.name}
            className="h-3/4 drop-shadow-pokemon group-hover:scale-110 ease-in duration-150"
          />
        </div>
      </div>
    </div>
  )
}

export default memo(PokemonCard)
