import React from 'react'

export default function Button(props){

  const className = props.isSelected === props.name ? 'selected' : ''

  return (
    <button
    className={className} 
    onClick={(event) => props.handleClick(event)} 
    name={props.name}
    >{props.text}</button>
  )
}