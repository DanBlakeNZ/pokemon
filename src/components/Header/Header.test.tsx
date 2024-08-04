import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('should render correctly with default guest username', () => {
    render(<Header />)

    expect(screen.getByText('Welcome Guest')).toBeInTheDocument()
    expect(screen.getByAltText('pokemon logo')).toBeInTheDocument()
    expect(screen.getByAltText('pikacheu')).toBeInTheDocument()
  })

  it('should render the username from localStorage', () => {
    const testUserName = 'Dan'
    const mockUserDetails = JSON.stringify({ userName: testUserName })
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(mockUserDetails)

    render(<Header />)
    expect(screen.getByText(`Welcome ${testUserName}`)).toBeInTheDocument()
    expect(screen.getByAltText('pokemon logo')).toBeInTheDocument()
    expect(screen.getByAltText('pikacheu')).toBeInTheDocument()
  })
})
