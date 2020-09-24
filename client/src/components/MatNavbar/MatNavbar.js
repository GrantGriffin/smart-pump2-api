import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'


class MatNavbar extends React.Component {

  state = {
    menuOpen: false
  }

  render(){
    const { logout } = this.props
    const { menuOpen } = this.state

    return (
      <AppBar position="absolute" data-testid="app-bar">
        <Toolbar>
          <Typography variant="h6">
            SMART Pump
          </Typography>
          <IconButton
            data-testid="hamburger-menu"
            style={{position: 'absolute', right: '0'}}
            color="inherit"
            ref={r => this.menuRef = r}
            onClick={() => this.setState({menuOpen: !menuOpen})}
            >
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Menu
          data-testid="navbar-menu"
          anchorEl={this.menuRef}
          open={menuOpen}
          onBlur={() => this.setState({menuOpen: false})}
          >
            <MenuItem
              data-testid="logout-menu-item"
              onClick={logout}
              >
                Log Out
            </MenuItem>
        </Menu>
    </AppBar>
    )
  }
}

export default MatNavbar
