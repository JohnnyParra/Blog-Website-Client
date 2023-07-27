import React from "react";
import { useSearchParams } from 'react-router-dom';
import './PageSelect.css'

export default React.memo(function PageSelect(props) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleSelect(event){
    searchParams.set('page', event.target.innerHTML)
    setSearchParams(searchParams);
  };
  
  const buttonElements = []
  for (let i = 0; i < props.pages; i++){
    buttonElements.push(
      <div 
      key={i}
      style={
        {
          color: searchParams.get('page') == i + 1 ? 'white': 'black', 
          backgroundColor: searchParams.get('page') == i + 1 ? 'rgb(255, 106, 0)' : 'white'
        }
      }
      onClick={(event) => handleSelect(event)}
      className='page-button'>
        {i + 1}
      </div>
    )
  }
  return(
    <div className='page-select-container'>
      {buttonElements}
    </div>
  )
});