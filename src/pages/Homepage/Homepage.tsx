import axios from 'axios'
import { PokemonClient, NamedAPIResourceList, Pokemon } from 'pokenode-ts'
import { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner/Spinner'
import PokemonList from '../../components/PokemonList/PokemonList'
import Header from '../../components/Header/Header'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'

export function Homepage() {
  const [pokemonListData, setPokemonListData] = useState<NamedAPIResourceList>()
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [pageLoaded, setPageLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')

  const pokemonApi = new PokemonClient()

  // On first load
  useEffect(() => {
    localStorage.setItem('favoritePokemonIds', JSON.stringify([]))

    // grab the list of pokemon (first 20) and update pokemonListData state.
    getListOfPokemon()
      .then((listOfPokemon) => {
        setPokemonListData(listOfPokemon)
        setPageLoaded(true)
      })
      .catch((error) => console.error(error))
  }, [])

  // When pokemonListData changes, use the list data to get all pokemon by name.
  useEffect(() => {
    getAllPokemonByName()
      .then(() => setIsLoading(false))
      .catch((error) => console.error(error))
  }, [pokemonListData])

  // Gets a list of all pokemon (first 20)
  function getListOfPokemon(): Promise<NamedAPIResourceList> {
    return new Promise((resolve, reject) => {
      pokemonApi
        .listPokemons()
        .then((listOfPokemon: NamedAPIResourceList) => resolve(listOfPokemon))
        .catch((error) => reject(error))
    })
  }

  // Using the data stored in pokemonListData, will get a list of all pokemon by name and store in pokemonList
  function getAllPokemonByName() {
    return new Promise<void>((resolve, reject) => {
      if (!pokemonListData) {
        return
      }

      const promises: Promise<Pokemon>[] = []

      pokemonListData.results.forEach((pokemonResult) => {
        promises.push(getPokemonByName(pokemonResult.name))
      })

      Promise.all(promises)
        .then((listOfPokemonByName) => {
          setPokemonList(listOfPokemonByName)
          resolve()
        })
        .catch((error) => reject(error))
    })
  }

  // Gets and returns a single pokemon based on its name.
  function getPokemonByName(name: string): Promise<Pokemon> {
    return new Promise((resolve, reject) => {
      if (!name) {
        reject('Missing pokemon name')
        return
      }

      pokemonApi
        .getPokemonByName(name)
        .then((pokemon) => resolve(pokemon))
        .catch((error) => reject(error))
    })
  }

  // Will fetch the next 20 pokemon in the list.
  async function updatePokemonListData() {
    if (!pokemonListData) {
      console.error('pokemonListData is missing')
      return
    }

    try {
      if (!pokemonListData.next) {
        console.error('pokemonListData.next url is missing')
        return
      }

      setIsLoading(true)

      // Request data and await the response
      const response = await axios.get(pokemonListData.next)

      // Update the state with the fetched data
      setPokemonListData((prevState) => {
        const { count, next, previous, results } = response.data
        const newListData: NamedAPIResourceList = {
          count,
          next,
          previous,
          results: [...prevState!.results, ...results],
        }
        return newListData
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleSearchInput(e: React.FormEvent<HTMLInputElement>) {
    setSearch(e.currentTarget.value.toLowerCase())
  }

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full h-full max-w-5xl flex flex-col items-center">
        <Header />

        {!pageLoaded && (
          <div className="flex w-full h-full justify-center items-center">
            <div className="h-20 w-20">
              <Spinner />
            </div>
          </div>
        )}

        {pageLoaded && (
          <>
            <div className="w-1/2 mt-5 drop-shadow-md">
              <Input
                type="text"
                onChange={handleSearchInput}
                label="Search Pokemon by name"
                hideLabel={true}
                placeholder="Search Pokemon by name"
              />
            </div>

            <PokemonList pokemonList={pokemonList} search={search} />

            <div className="w-1/4 flex flex-row justify-evenly mb-5 pt-5">
              <Button disabled={!pokemonListData?.next || isLoading} type="button" onClick={updatePokemonListData}>
                {isLoading ? 'Loading...' : 'Load more'}
                {isLoading && (
                  <div className="ml-2 h-5 w-5">
                    <Spinner />
                  </div>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Homepage
