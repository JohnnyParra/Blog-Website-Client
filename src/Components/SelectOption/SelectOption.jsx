// Libraries
import React, { useState, useEffect } from "react";

// MUI Components && Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Hooks
import useDetectClick from '../../hooks/useDetectClick';

// Styling
import './SelectOption.css';

export default function FieldSet(props) {
  const { ref, btnRef, isDropDown, setIsDropDown } = useDetectClick();
  const [sort, setSort] = useState(props.start || props.options[0].value);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [title, setTitle] = useState(() => {
    const initialOption = props.options.find(option => option.value == (props.start || props.options[0].value));
    return initialOption ? initialOption.title : '';
  });

  useEffect(() => {
    if (isDropDown) {
      const handleKeyDown = (event) => {
        event.preventDefault();
        if (event.key === 'ArrowDown') {
          setHighlightedIndex((prevIndex) => (prevIndex + 1) % props.options.length);
        } else if (event.key === 'ArrowUp') {
          setHighlightedIndex((prevIndex) => (prevIndex - 1 + props.options.length) % props.options.length);
        } else if (event.key === 'Escape' || event.key === 'Backspace') {
          setIsDropDown(false);
          setHighlightedIndex(0);
        }
      };
      
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isDropDown, highlightedIndex, props.options]);

  const handleMouseOver = (index) => {
    setHighlightedIndex(index);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isDropDown) {
      setIsDropDown(true);
    } else if (event.key === 'Enter') {
      const selectedOption = props.options.find((option, index) => index === highlightedIndex)
      setSort(selectedOption.value);
      setTitle(selectedOption.title);
      props.handleSelect(selectedOption.value);
      setIsDropDown(false);
    }
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
      className={`option-container${option.value == sort ? " selected" : ""}${index === highlightedIndex ? " highlighted" : ""}`} 
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
        onKeyDown={(event) => handleKeyDown(event)}
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