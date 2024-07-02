// Libraries
import React from 'react';

// Styling
import './SquareButton.css';

/* 
--All Props--
-prop name : type, extra-
className: string, className
name: string, name
title: string, title
text: string,  text inside of the button
disabled: boolean
shape: string, {"square"}
color: string, {"primary"}
isSelected: boolean
onClick: function
icon: svg
aria-label: string
*/

export default React.memo(function SquareButton(props) {
  const customClass = props.className ? props.className : '';
  const selectedClass = props.isSelected ? '' : 'square-button-not-selected';
  const disabledClass = props.disabled ? 'square-button-disabled' : '';
  const colorClass = props.color ? `square-button-${props.color}` : '';
  const shapeClass = props.shape ? `square-button-${props.shape}` : '';

  function checkDisabled(event) {
    if (!props.disabled) {
      props.onClick(event);
    }
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      props.onClick(event);
    }
  }

  return (
    <div
      className={`square-button ${customClass} ${colorClass} ${selectedClass} ${shapeClass} ${disabledClass}`} 
      onClick={(event) => checkDisabled(event)} 
      onKeyDown={(event) => handleKeyDown(event)}
      disabled={props.disabled}
      name={props.name}
      title={props.name}
      tabIndex="0"
      role="button"
      aria-label={props.ariaLabel}
    >
      {props.icon && <>{props.icon}</>}
      <span className={`text ${props.icon ? "icon-margin" : ""}`}>{props.text}</span>
    </div>
  );
});