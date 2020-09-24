import React from 'react'
import { FormControl, FormLabel, TextField } from '@material-ui/core'
import './ProfileEdit.css'
class ProfileEdit extends React.Component {

  // easier to override material-ui with inline styling
  fieldStyle = {
    formControl: {
      marginBottom: '16px',
      width: '100%'
    },
    label: {
      textAlign: 'left',
      paddingLeft: '12px'
    }
  }

  render() {
    const { userData, updateField } = this.props

    return (
      <form data-testid="profile-edit-form" className="profile-edit__form">
        <FormControl style={this.fieldStyle.formControl} className="profile-edit__input">
          <FormLabel style={this.fieldStyle.label}>First Name:</FormLabel>
          <TextField
            inputProps={{ "data-testid": "first-name" }}
            variant="outlined"
            defaultValue={(userData && userData.name) ? userData.name.first : ''}
            onChange={e => updateField({name: {first: e.target.value}})}
          />
        </FormControl>
        <FormControl style={this.fieldStyle.formControl} className="profile-edit__input">
          <FormLabel style={this.fieldStyle.label}>Last Name:</FormLabel>
          <TextField
            inputProps={{ "data-testid": "last-name" }}
            variant="outlined"
            defaultValue={(userData && userData.name) ? userData.name.last : ''}
            onChange={e => updateField({name: {last: e.target.value}})}
          />
        </FormControl>
        <FormControl style={this.fieldStyle.formControl} className="profile-edit__input">
          <FormLabel style={this.fieldStyle.label}>Company:</FormLabel>
          <TextField
            inputProps={{ "data-testid": "company" }}
            variant="outlined"
            defaultValue={userData ? userData.company : ''}
            onChange={e => updateField({company: e.target.value})}
          />
        </FormControl>
        <FormControl style={this.fieldStyle.formControl} className="profile-edit__input">
          <FormLabel style={this.fieldStyle.label}>Address:</FormLabel>
          <TextField
            inputProps={{ "data-testid": "address" }}
            variant="outlined"
            defaultValue={userData ? userData.address : ''}
            onChange={e => updateField({address: e.target.value})}
          />
        </FormControl>
        <FormControl style={this.fieldStyle.formControl} className="profile-edit__input">
          <FormLabel style={this.fieldStyle.label}>Phone:</FormLabel>
          <TextField
            inputProps={{ "data-testid": "phone" }}
            variant="outlined"
            defaultValue={userData ? userData.phone : ''}
            onChange={e => updateField({phone: e.target.value})}
          />
        </FormControl>
        <FormControl style={this.fieldStyle.formControl} className="profile-edit__input">
          <FormLabel style={this.fieldStyle.label}>Eye Color:</FormLabel>
          <TextField
            inputProps={{ "data-testid": "eye-color" }}
            variant="outlined"
            defaultValue={userData ? userData.eyeColor : ''}
            onChange={e => updateField({eyeColor: e.target.value})}
          />
        </FormControl>
      </form>
    )
  }
}

export default ProfileEdit