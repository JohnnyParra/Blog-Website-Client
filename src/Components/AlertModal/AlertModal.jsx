import React from "react";

import useTrapFocus from "../../hooks/useTrapFocus";

import './AlertModal.css';

export default function AlertModal(props) {
  const { modalRef } = useTrapFocus(props.isOpen, props.setIsOpen);

  return props.isOpen ? (
    <div className="overlay-delete-container requires-no-scroll" ref={modalRef}>
      <div className="page-overlay"></div>
      <div
        className="check-delete-container"
        role="alertdialog"
        aria-modal='true'
        aria-labelledby="delete-dialog-label"
        aria-describedby="delete-dialog-description"
      >
        <span id="delete-dialog-label">
          {props.label}
        </span>
        <span id="delete-dialog-description">
          {props.description}
        </span>
        <div className="options">
          <button
            className="cancel"
            onClick={() => props.cancel()}
            aria-label="cancel delete"
          >
            Cancel
          </button>
          <button
            className="delete"
            onClick={() => props.delete()}
            aria-label="confirm delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}