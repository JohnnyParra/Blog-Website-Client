// Libraries
import React, { useState } from "react";

// MUI Components && Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Hooks
import useDetectClick from '../../hooks/useDetectClick';

// Styling
import './SelectOption.css';

export default function FieldSet(props) {
  const { ref, btnRef, isDropDown, setIsDropDown, highlightIndex, setHighlightIndex} = useDetectClick();
  const [sort, setSort] = useState(props.start || props.options[0].value);
  const [title, setTitle] = useState(() => {
    const initialOption = props.options.find(option => option.value == (props.start || props.options[0].value));
    return initialOption ? initialOption.title : '';
  });


  const handleMouseOver = (index) => {
    setHighlightIndex(index);
  };

  const handleChange = (event) => {
    const value = event.currentTarget.getAttribute('data-value');
    const newTitle = event.currentTarget.getAttribute('data-title');
    setTitle(newTitle);
    setSort(value);
    props.handleSelect(value);
  };



  const optionElements = props.options.map((option, index) => (
    <div 
      key={option.value} 
      className={`link option-container${option.value == sort ? " selected" : ""}${index === highlightIndex ? " highlighted" : ""}`} 
      onClick={(event) => handleChange(event)}
      onMouseOver={() => handleMouseOver(index)}
      role="option" 
      aria-selected={option.value === sort}
      data-value={option.value} 
      data-title={option.title}
    >
      <div className="option">
        <span>{option.title}</span>
      </div>
    </div>
  ));

  return (
    <form className="select-container">
      <label 
        id='select-label' 
        className="label" 
        htmlFor="select-input"
      >
        {props.selection}
      </label>
      <div 
        ref={btnRef} 
        id="select" 
        className="select" 
        tabIndex="0" 
        role="combobox"
        aria-labelledby="select-label"
        aria-expanded={isDropDown ? "true" : "false"}
        aria-controls="dropdown-list"
        aria-haspopup="listbox"
      > 
        <input 
          id="select-input"
          tabIndex="-1"
          aria-hidden="true"
          readOnly
          hidden
        />
        <div className="text">
          <span>{title}</span>
          {isDropDown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        <div 
          ref={ref} 
          id="dropdown-list"
          className={`dropdown-content-container${isDropDown ? " show" : ""}`} 
          role="listbox"
        >
          <div className="dropdown-content">
            {optionElements}
          </div>
        </div>
      </div>
    </form>
  )
}