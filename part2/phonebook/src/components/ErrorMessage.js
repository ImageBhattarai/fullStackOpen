import React from 'react'

const ErrorMessage = (props) => {
    if (props.message === null) {
      return null
    }
    return(
      <div className="error">{props.message}</div>
    )
  }

export default ErrorMessage;