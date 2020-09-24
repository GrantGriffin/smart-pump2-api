import React from 'react'
import ProfileEdit from './ProfileEdit'
import { render, fireEvent, wait, getByTestId } from '@testing-library/react'

const userDataMock = {
  name: {
    first: 'bob',
    last: 'boberson'
  },
  company: 'bobtech',
  address: '123 bob st',
  phone: '123-456-7890',
  eyeColor: 'brown'
}

const updateFieldMockFn = jest.fn()

describe('ProfileEdit', () => {

  it('should render & not crash when userData is not supplied', () => {
    const { getByTestId } = render(<ProfileEdit/>)
    expect(getByTestId('profile-edit-form')).toBeTruthy()
  })

  it('should display all fields when userData is supplied', () => {
    const { getByTestId } = render(<ProfileEdit userData={userDataMock} />)
    expect(getByTestId('first-name').defaultValue).toBe(userDataMock.name.first)
    expect(getByTestId('last-name').defaultValue).toBe(userDataMock.name.last)
    expect(getByTestId('company').defaultValue).toBe(userDataMock.company)
    expect(getByTestId('address').defaultValue).toBe(userDataMock.address)
    expect(getByTestId('phone').defaultValue).toBe(userDataMock.phone)
    expect(getByTestId('eye-color').defaultValue).toBe(userDataMock.eyeColor)
  })

  // TODO: resolve testing issues with material ui
  it.skip('should update any user field onChange', async () => {
    const { getByTestId } = render(<ProfileEdit userData={userDataMock} updateField={updateFieldMockFn} />)


    fireEvent.change(getByTestId('first-name', {target: {value: 'test'}}))
    await wait(() => {
      expect(updateFieldMockFn).toHaveBeenCalledWith({name: { first: 'test'}})
    })
    fireEvent.change(getByTestId('last-name', {target: {value: 'test'}}))
    fireEvent.change(getByTestId('company', {target: {value: 'test'}}))
    fireEvent.change(getByTestId('address', {target: {value: 'test'}}))
    fireEvent.change(getByTestId('phone', {target: {value: 'test'}}))
    fireEvent.change(getByTestId('eye-color', {target: {value: 'test'}}))

  })
})