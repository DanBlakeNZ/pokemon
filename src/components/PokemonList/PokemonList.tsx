import { useEffect, useState } from 'react'
import PokemonCard from '../PokemonCard/PokemonCard'
import { Pokemon } from 'pokenode-ts'
import PokemonDetailsModal from '../PokemonDetailsModal/PokemonDetailsModal'

type PokemonDetailsModalProps = {
  pokemonList: Pokemon[]
  search: string
}

function PokemonList({ pokemonList, search }: PokemonDetailsModalProps) {
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon>()
  const [favoritePokemonIds, setFavoritePokemonIds] = useState<number[]>([])
  const [showPokemonInfo, setShowPokemonInfo] = useState(false)

  // Grab any existing favorite ids on first render and set
  useEffect(() => {
    const existingIds = localStorage.getItem('favoritePokemonIds')
    if (existingIds) {
      setFavoritePokemonIds(JSON.parse(existingIds))
    }
  }, [])

  // Pass in a Pokemon and see if the name could be part of the search text
  function pokemonNameInSearch(pokemon: Pokemon) {
    return search === '' ? pokemon : pokemon.name.toLowerCase().includes(search)
  }

  function onCardClick(pokemon: Pokemon) {
    setSelectedPokemon(pokemon)
    toggleModal()
  }

  function toggleModal() {
    setShowPokemonInfo(!showPokemonInfo)
  }

  function onToggleFavorite(pokemonId: number) {
    setFavoritePokemonIds((prevIds) => {
      // Check previously stored ids to see if pokemonId is included
      const isExistingFavorite = prevIds.includes(pokemonId)
      let updatedIds = []

      // If it is included
      if (isExistingFavorite) {
        // Filter out pokemonId from favorites
        updatedIds = prevIds.filter((id) => id !== pokemonId)
      } else {
        // Add the pokemonId to existing favorites
        updatedIds = [...prevIds, pokemonId]
      }

      // Update the local storage state as well (could move to a useEffect)
      localStorage.setItem('favoritePokemonIds', JSON.stringify(updatedIds))
      return updatedIds
    })
  }

  return (
    <>
      <ul className="flex flex-row gap-4 h-full flex-wrap overflow-scroll mt-5 p-5 justify-evenly">
        {/* Run the list of pokemon through the search text*/}
        {pokemonList
          .filter((pokemon) => pokemonNameInSearch(pokemon))
          .map((pokemon) => {
            return (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                favoritePokemonIds={favoritePokemonIds}
                onCardClick={onCardClick}
                onToggleFavorite={onToggleFavorite}
              />
            )
          })}
      </ul>

      {/* The Modal that displays more information about the clicked Pokemon */}
      {showPokemonInfo && selectedPokemon && (
        <PokemonDetailsModal
          onToggleFavorite={onToggleFavorite}
          pokemon={selectedPokemon}
          hideModal={() => toggleModal()}
        />
      )}
    </>
  )
}

export default PokemonList
