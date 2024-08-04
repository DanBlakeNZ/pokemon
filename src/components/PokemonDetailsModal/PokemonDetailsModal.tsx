import { CircleX, Heart } from 'lucide-react'
import { Pokemon } from 'pokenode-ts'
import pokeBallIcon from '../../assets/poke_ball_icon.svg'
import { useEffect, useState } from 'react'
import Button from '../Button/Button'

type PokemonDetailsModalProps = {
  pokemon: Pokemon
  hideModal: () => void
  onToggleFavorite: (id: number) => void
}

function PokemonDetailsModal({ pokemon, hideModal, onToggleFavorite }: PokemonDetailsModalProps) {
  const { abilities, height, weight, base_experience } = pokemon
  const [isFavorite, setIsFavorite] = useState<boolean>(false)

  // Artwork
  let artworkUrl = pokeBallIcon
  const officialArtworkUrl = pokemon.sprites.other?.['official-artwork'].front_default
  if (officialArtworkUrl) {
    artworkUrl = officialArtworkUrl
  }

  useEffect(() => {
    const existingIds = localStorage.getItem('favoritePokemonIds')
    if (existingIds) {
      const parsedIds = JSON.parse(existingIds)
      const isFavoriteId = parsedIds.find((id: number) => id === pokemon.id)
      setIsFavorite(isFavoriteId)
    }
  }, [pokemon.id])

  function handleCloseButtonClick() {
    hideModal()
  }

  function handleFavoriteButtonClick() {
    setIsFavorite(!isFavorite)
    onToggleFavorite(pokemon.id)
  }

  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 z-10 ">
      <div className="bg-white w-3/4 max-w-4xl h-96 z-20 absolute rounded border-4 border-pokemon-dark-blue">
        <div
          className="w-10 flex items-center justify-center p-2.5 right-0 absolute cursor-pointer z-20 hover:scale-110 ease-in duration-100 "
          onClick={handleCloseButtonClick}
        >
          <CircleX color="#3c5aa6" />
        </div>

        <div className="flex flex-row h-full">
          <div className="w-1/2 bg-card-background bg-cover justify-center items-center flex">
            <img src={artworkUrl} alt={pokemon.name} className="drop-shadow-pokemon h-full scale-125" />
          </div>
          <div className="relative pl-7 pt-7 w-1/2">
            <h1 className="capitalize font-PokemonSolid tracking-widest text-2xl antialiased text-pokemon-dark-blue drop-shadow mb-5">
              {pokemon.name}
            </h1>

            {base_experience && (
              <div className="mb-1">
                <p>
                  <span className="text-pokemon-dark-blue">Base Experience:</span> {base_experience}
                </p>
              </div>
            )}

            {height && (
              <div className="mb-1">
                <p>
                  <span className="text-pokemon-dark-blue">Height:</span> {height}
                </p>
              </div>
            )}

            {weight && (
              <div className="mb-1">
                <p>
                  <span className="text-pokemon-dark-blue">Weight:</span> {weight}
                </p>
              </div>
            )}

            {abilities && (
              <div className="mb-1">
                <p className="text-pokemon-dark-blue">Abilities:</p>
                <ul>
                  {abilities.map((ability, index) => {
                    return (
                      <li key={index} className="list-disc capitalize ml-4">
                        {ability.ability.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            <div className="absolute bottom-3 left-0 w-full flex justify-center">
              <div className="flex justify-center w-3/4">
                <Button onClick={handleFavoriteButtonClick}>
                  <div className="flex justify-center items-center">
                    <p className="mr-2">{isFavorite ? 'Remove from' : 'Add to'} Favorites</p>
                    <Heart color={isFavorite ? '#fa0000' : '#fff'} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black opacity-80 w-full h-full"></div>
    </div>
  )
}

export default PokemonDetailsModal
