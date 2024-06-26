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
      className={`option-container${option.value == sort ? " selected" : ""}${index === highlightedIndex ? " highlighted" : ""}`} 
      key={option.value} 
      role="option" 
      aria-selected={option.value === sort}
      data-value={option.value} 
      data-title={option.title}
      onClick={(event) => handleChange(event)}
      onMouseOver={() => handleMouseOver(index)}
    >
      <div className="option">
        <span>{option.title}</span>
      </div>
    </div>
  ));

  return (
    <div className="select-container" role="form">
      <div className="label" id="select-label" role="label">{props.selection}</div>
      <div className="select" aria-labelledby="select-label" tabIndex="0" role="select" ref={btnRef} onKeyDown={(event) => handleKeyDown(event)}>
        <div className="text">
          <span>{title}</span>
          {isDropDown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>
        <div className={`dropdown-content-container${isDropDown ? " show" : ""}`} ref={ref} >
          <div className="dropdown-content">
            {optionElements}
          </div>
        </div>
      </div>
    </div>
  )
}