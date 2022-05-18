import React from 'react'
import { Message } from './ErrorMessage.style';

export default function ErrorMessage({errors, name}) {
    const error = errors[name];
  return (
    <Message>
        {error && error.message}
    </Message>
  )
}
