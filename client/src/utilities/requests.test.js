import mockAxios from 'axios'
import {
  authenticateUserRequest,
  readUserRequest,
  updateUserFieldsRequest
} from './requests'

describe('requests', () => {

  describe('authenticateUserRequest', () => {
    it('should return a guid with a successful request ', () => {
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            guid: 'eab0324c-75ef-49a1-9c49-be2d68f50b96'
          }
        })
      )
      authenticateUserRequest('bob@bob.com', '12345678').then(res => {
        expect(res).toEqual('eab0324c-75ef-49a1-9c49-be2d68f50b96')
      })
    })

    it('should throw an error when the request fails', () => {
        mockAxios.post.mockImplementationOnce(() =>
          Promise.reject('auth request failed and stuff')
        )
        authenticateUserRequest().catch(err => {
          expect(err).toEqual('auth request failed and stuff')
        })
    })
  })
  
  describe('readUserRequest', () => {
    const userData = {
      data: {
        picture: 'some-pic-url.com',
        balance: '$10000',
        name:{
          first: 'bob',
          last: 'boberson'
        },
        company: 'bobCO',
        address: '123 bob st',
        phone: '123-456-7890',
        eyeColor: 'brown'
      }
    }

    it('should return a user when a request is successful', () => {
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve(userData)
      )
      readUserRequest('eab0324c-75ef-49a1-9c49-be2d68f50b96').then(res => {
        expect(res).toEqual(userData)
      })
    })

    it('should throw an error when the request fails', () => {
        mockAxios.post.mockImplementationOnce(() =>
          Promise.reject('user request failed')
        )
        readUserRequest().catch(err => {
          expect(err).toEqual('user request failed')
        })
    })
  })

  describe('updateUserFieldsRequest', () => {
    it('should return a success response if successful', () => {
      mockAxios.post.mockImplementationOnce(() =>
        Promise.resolve({
          status: 200
        })
      )
      updateUserFieldsRequest({ guid: '123', name: {first: 'bob'}}).then(res => {
        expect(res.status).toEqual(200)
      })
    })

    it('should throw an error when the request fails', () => {
        mockAxios.post.mockImplementationOnce(() =>
          Promise.reject('updateUserFieldsRequest failed')
        )
        updateUserFieldsRequest({ guid: '123', name: {first: 'bob'}}).catch(err => {
          expect(err).toEqual('updateUserFieldsRequest failed')
        })
    })

  })

})