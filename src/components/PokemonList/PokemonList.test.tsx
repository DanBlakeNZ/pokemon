import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import PokemonList from './PokemonList'
import { Pokemon } from 'pokenode-ts'

// Mock the PokemonCard
vi.mock('../PokemonCard/PokemonCard', () => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (props: any) => <div>{props.pokemon.name}</div>,
  }
})

const testPokemonData = [
  { name: 'Bulbasaur', id: 1 } as unknown as Pokemon,
  { name: 'Charmander', id: 4 } as unknown as Pokemon,
  { name: 'Squirtle', id: 7 } as unknown as Pokemon,
]

describe('PokemonList Component', () => {
  it('renders Pokemon list with given props', () => {
    render(<PokemonList pokemonList={testPokemonData} search="" />)

    expect(screen.getByText('Bulbasaur')).toBeInTheDocument()
    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.getByText('Squirtle')).toBeInTheDocument()
  })

  it('filters Pokemon based on search term', () => {
    render(<PokemonList pokemonList={testPokemonData} search="char" />)

    expect(screen.queryByText('Bulbasaur')).not.toBeInTheDocument()
    expect(screen.getByText('Charmander')).toBeInTheDocument()
    expect(screen.queryByText('Squirtle')).not.toBeInTheDocument()
  })
})
