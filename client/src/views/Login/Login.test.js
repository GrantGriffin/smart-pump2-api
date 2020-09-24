import React from 'react'
import Login from './Login'
import { render, fireEvent, wait } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import * as requests from '../../utilities/requests'

jest.mock('../../utilities/requests')

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))


describe('Login Page', () => {
  
  it('should render', () => {
    const { getByTestId } = render(<Login />)
    expect(getByTestId('login-container')).toBeTruthy()
  })

  it('should disable login button by default', () => {
    const { getByTestId } = render(<Login />)
    expect(getByTestId('login-submit').firstChild.disabled).toBe(true)
  })

  it('should display field errors correctly', () => {
    const { getByTestId, queryByTestId } = render(<Login />)
    const emailField = getByTestId('login-email')
    const passwordField = getByTestId('login-password')

    expect(queryByTestId('email-error-text')).not.toBeInTheDocument()
    expect(queryByTestId('password-error-text')).not.toBeInTheDocument()

    // give an invalid email
    fireEvent.change(emailField, { target: { value: 'test' }})
    expect(queryByTestId('email-error-text')).toBeInTheDocument()
    expect(queryByTestId('password-error-text')).not.toBeInTheDocument()

    // give a password less than 8 characters
    fireEvent.change(passwordField, { target: { value: '123'}})
    expect(queryByTestId('email-error-text')).toBeInTheDocument()
    expect(queryByTestId('password-error-text')).toBeInTheDocument()

    // give correct email
    fireEvent.change(emailField, { target: { value: 'test@test.com' }})
    expect(queryByTestId('email-error-text')).not.toBeInTheDocument()
    expect(queryByTestId('password-error-text')).toBeInTheDocument()

    // give password of 8 characters
    fireEvent.change(passwordField, { target: { value: '12345678' }})
    expect(queryByTestId('email-error-text')).not.toBeInTheDocument()
    expect(queryByTestId('password-error-text')).not.toBeInTheDocument()
  })

  it('should enable the login button when fields meet requirements', () => {
    const { getByTestId } = render(<Login />)
    fireEvent.change(getByTestId('login-email'), { target: { value: 'test@test.com' }})
    fireEvent.change(getByTestId('login-password'), { target: { value: '12345678' }})

    expect(getByTestId('login-submit').firstChild.disabled).toBe(false)

  })

  it.skip('should store userGuid in localStorage navigate to /profile when a user is authenticated', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    )
    requests.authenticateUserRequest = jest.fn().mockResolvedValueOnce({guid: '123'})

    fireEvent.change(getByTestId('login-email'), { target: { value: 'test@test.com' }})
    fireEvent.change(getByTestId('login-password'), { target: { value: '12345678' }})

    expect(getByTestId('login-submit').firstChild.disabled).toBe(false)

    fireEvent.click(getByTestId('login-submit'))
    await wait(() => {
      expect(requests.authenticateUserRequest).toHaveBeenCalledTimes(1)
    })
    // expect(mockHistoryPush).toHaveBeenCalledWith('/profile')
  })

  it.skip('should NOT store userGuid in localStorage and return an error when user authentication fails', () => {

    //snackbar?

  })
})