import React from 'react'
import MatButton from './MatButton'
import { render, fireEvent } from '@testing-library/react'

describe('MatButton', () => {

  it('should render', () => {
    const { getByTestId } = render(<MatButton />)
    expect(getByTestId('button')).toBeTruthy()
  })

  it('should call the handler when clicked', () => {
    const handlerMock = jest.fn()
    const { getByTestId } = render(<MatButton handler={handlerMock} />)
    const button = getByTestId('button')
    fireEvent.click(button)

    expect(handlerMock).toHaveBeenCalledTimes(1)
  })
})