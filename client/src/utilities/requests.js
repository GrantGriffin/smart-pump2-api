import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const authenticateUserRequest = (email, password) => {
  return axios.post(`${apiUrl}/auth`, {email, password})
    .then(res => res.data.guid)
    .catch(err => {
      console.log('authenticateUserRequest failure', {err})
      throw err
    })
}

export const readUserRequest = (guid) => {
  const userGuid = guid || localStorage.getItem('userGuid')
  return axios.post(`${apiUrl}/readUser`, {guid: userGuid})
    .then(res => res)
    .catch(err => {
      console.log('readUserRequest failure', {err})
      throw err
    })
}

export const updateUserFieldsRequest = updateObj => {
  updateObj.guid = updateObj.guid || localStorage.getItem('userGuid')
  return axios.post(`${apiUrl}/updateUserFields`, updateObj)
    .then(res => res)
    .catch(err => {
      console.log('updateUserFieldsRequest failure', {err})
      throw err
    })
}
