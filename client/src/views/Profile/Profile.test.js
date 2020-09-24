import React from 'react'
import Profile from './Profile'
import { render, fireEvent, wait } from '@testing-library/react'

describe('Profile Page', () => {

  // local storage mocking broken workaround with props
  it('should render', () => {
    const { getByTestId } = render(<Profile guidMock="eab0324c-75ef-49a1-9c49-be2d68f50b96" />)
    expect(getByTestId('profile')).toBeTruthy()
  })

  it('should display balance by default', () => {
    const { getByTestId, queryByTestId } = render(<Profile guidMock="eab0324c-75ef-49a1-9c49-be2d68f50b96" />)
    expect(getByTestId('profile-balance')).toBeInTheDocument()
    expect(queryByTestId('profile-edit')).not.toBeInTheDocument()
  })

  it('should toggle between balance and edit mode when buttons are clicked', async () => {
    const { getByTestId, queryByTestId } = render(<Profile guidMock="eab0324c-75ef-49a1-9c49-be2d68f50b96" />)
    expect(getByTestId('profile-balance')).toBeInTheDocument()
    expect(queryByTestId('profile-edit')).not.toBeInTheDocument()

    fireEvent.click(getByTestId('profile-edit-button').firstChild)
    await wait(() => {
      expect(queryByTestId('profile-balance')).not.toBeInTheDocument()
      expect(getByTestId('profile-edit')).toBeInTheDocument()
    })

    fireEvent.click(getByTestId('profile-balance-button').firstChild)
    await wait(() => {
      expect(getByTestId('profile-balance')).toBeInTheDocument()
      expect(queryByTestId('profile-edit')).not.toBeInTheDocument()
    })
  })
})