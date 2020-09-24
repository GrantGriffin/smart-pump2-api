
import React from 'react'
import MatNavbar from './MatNavbar'
import { render, fireEvent, wait } from '@testing-library/react'

describe('MatNavbar', () => {

  it('should render', () => {
    const { getByTestId } = render(<MatNavbar />)
    expect(getByTestId('app-bar')).toBeTruthy()
  })

  it('should open menu when hamburger button is clicked', () => {
    const { getByTestId, queryByTestId } = render(<MatNavbar />)
    const hamburgerMenu = getByTestId('hamburger-menu')

    expect(queryByTestId('logout-menu-item')).not.toBeInTheDocument()
    fireEvent.click(hamburgerMenu)
    expect(getByTestId('logout-menu-item').innerHTML).toEqual('Log Out<span class=\"MuiTouchRipple-root\"></span>')
  })

  it('should close the menu on blur', async () => {
    const { getByTestId, queryByTestId } = render(<MatNavbar />)
    const hamburgerMenu = getByTestId('hamburger-menu')

    expect(queryByTestId('logout-menu-item')).not.toBeInTheDocument()
    fireEvent.click(hamburgerMenu)
    expect(getByTestId('logout-menu-item').innerHTML).toEqual('Log Out<span class=\"MuiTouchRipple-root\"></span>')

    fireEvent.blur(getByTestId('navbar-menu'))
    await wait(() => {
      // shows menu present in tests though ui does not
      expect(queryByTestId('logout-menu-item')).not.toBeInTheDocument()
    })
  })

  it('should call the logout handler when logout is clicked', async () => {
    const logoutMock = jest.fn()
    const { getByTestId, queryByTestId } = render(<MatNavbar logout={logoutMock} />)
    const hamburgerMenu = getByTestId('hamburger-menu')

    expect(queryByTestId('logout-menu-item')).not.toBeInTheDocument()
    fireEvent.click(hamburgerMenu)
    expect(getByTestId('logout-menu-item').innerHTML).toEqual('Log Out<span class=\"MuiTouchRipple-root\"></span>')

    fireEvent.click(getByTestId('logout-menu-item'))
    expect(logoutMock).toHaveBeenCalledTimes(1)
  })

})