import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from './Button'

const buttonText = 'Test Button'

describe('Button Component', () => {
  it('renders with default type and children', () => {
    render(<Button>{buttonText}</Button>)

    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveAttribute('type', 'button')
  })

  it('renders with a custom type', () => {
    render(<Button type="submit">{buttonText}</Button>)

    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeInTheDocument()
    expect(buttonElement).toHaveAttribute('type', 'submit')
  })

  it('renders as disabled when disabled prop is true', () => {
    render(<Button disabled>{buttonText}</Button>)

    const buttonElement = screen.getByText(buttonText)
    expect(buttonElement).toBeDisabled()
  })

  it('calls onClick handler when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>{buttonText}</Button>)

    const buttonElement = screen.getByText(buttonText)
    fireEvent.click(buttonElement)

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick handler when disabled', () => {
    const handleClick = vi.fn()
    render(
      <Button onClick={handleClick} disabled>
        {buttonText}
      </Button>
    )

    const buttonElement = screen.getByText(buttonText)
    fireEvent.click(buttonElement)

    expect(handleClick).not.toHaveBeenCalled()
  })
})
