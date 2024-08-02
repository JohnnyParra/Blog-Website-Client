import React from "react";

import { moreOptionsCommentUser } from "../../Utils/MoreOptionsCommentUser";
import { moreOptionsCommentNonuser } from "../../Utils/MoreOptionsCommentNonuser";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import useDetectClick from "../../hooks/useDetectClick";

import './DropDownButton.css'

export default function DropDownButton(props) {
  const { ref, btnRef, isDropDown, setIsDropDown, highlightIndex, setHighlightIndex } = useDetectClick();

  const chosenOptions = props.isUser ? moreOptionsCommentUser : moreOptionsCommentNonuser;
  const optionElements = chosenOptions.map((option, index) => {
    return (
      <div
        key={`${props.commentId}${index}`}
        className={`link ${highlightIndex == index ? 'highlighted': ''}`}
        onClick={() => props.handleClick(option.title)}
        onMouseOver={() =>setHighlightIndex(index)}
        data-index={index}
        role="menuitem"
        aria-label={`${option.title} comment`}
      >
        <div className="icon">
          {option.icon}
        </div>
        <div className="text">
          <span>{option.title}</span>
        </div>
      </div>
    )
  })

  return(
    <div className="more-component">
      <div
        className="more"
        title="more options"
        ref={btnRef}
        tabIndex='0'
        role='menu'
        aria-expanded={isDropDown}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        aria-label="more options"
      >
        <MoreVertIcon fontSize="large" />
      </div>
      <div
        className={`dropdown-content${isDropDown ? " show" : ""}`}
        id='dropdown-menu'
        ref={ref}
      >
        <div className="link-container">
          {optionElements}
        </div>
      </div>
    </div>
  )
}