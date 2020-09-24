import React from 'react'
import logo from '../../assets/logo.png'
import MatButton from '../../components/MatButton/MatButton'
import ProfileEdit from '../../components/ProfileEdit/ProfileEdit'
import MatNavbar from '../../components/MatNavbar/MatNavbar'
import { Divider } from '@material-ui/core'
import { updateUserFieldsRequest, readUserRequest } from '../../utilities/requests'
import './Profile.css'

class Profile extends React.Component {

  state = {
    editMode: false,
    userData: null
  }

  componentDidMount() {
    // local storage mocking workaround
    const { guidMock } = this.props
    const userGuid = localStorage.getItem('userGuid') || guidMock
    if(userGuid.length > 30 ) {
      readUserRequest()
        .then(res => {
          this.setState({userData: res.data})
        })
        .catch(err => console.log({err}))
    } else {
      this.props.history.push('/')
    }
  }

  updateField = updateObj => {
    updateUserFieldsRequest(updateObj)
  }

  logout = () => {
    localStorage.setItem('userGuid', '')
    this.setState({menuOpen: false})
    this.props.history.push('/')
  }


  render() {
    const { editMode, userData } = this.state

    return (
      <div data-testid="profile">
        <MatNavbar logout={this.logout} />
        <div className="profile__container">
        <div className="profile__picture">
          <img
            src={userData ? userData.picture : logo}
            alt="Logo"
            className="profile__image"
          />
        </div>
        <div className="profile__button-row">
          <div data-testid="profile-balance-button" className="profile__button">
            <MatButton
              fullWidth={true}
              handler={() => this.setState({editMode: false})}
              >
                BALANCE
            </MatButton>
          </div>
          <div data-testid="profile-edit-button" className="profile__button">
            <MatButton
              fullWidth={true}
              handler={() => this.setState({editMode: true})}
              >
                EDIT
            </MatButton>
          </div>
        </div>
        <Divider />
        <div className="profile__details">
          {editMode ?
            (
              <div data-testid="profile-edit">
                <ProfileEdit 
                  userData={userData}
                  updateField={this.updateField}
                  />
              </div>
            ) 
            : 
            (
              <div
                className="profile__balance"
                data-testid="profile-balance"
                >
                <label>Balance:</label>
                <div>{userData ? userData.balance : ''}</div>
              </div>
            )
          }
        </div>
      </div>
      </div>
    )
  }


}


export default Profile