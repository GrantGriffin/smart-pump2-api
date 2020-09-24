import React from 'react'
import { Button } from '@material-ui/core'

export default class MatButton extends React.Component {
  
  render() {
    const {
      children,
      fullWidth = false,
      color = 'primary',
      size = 'large',
      variant = "contained",
      disabled,
      style,
      handler,
    } = this.props

    return (
      <Button
        data-testid="button"
        fullWidth={fullWidth}
        color={color}
        size={size}
        variant={variant}
        disabled={disabled}
        style={style}
        onClick={handler}
        >
          {children}
      </Button>
    )
  }
}