import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import useTrapFocus from "../../../hooks/useTrapFocus";

import './NotLoggedIn.css';

export default function NotLoggedIn(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalRef } = useTrapFocus(props.isOpen, props.setIsOpen);

  return props.isOpen ? (
    <div className="overlay-delete-container requires-no-scroll" ref={modalRef}>
      <div className="page-overlay"></div>
      <div
        className="check-delete-container"
        role="alertdialog"
        aria-modal='true'
        aria-labelledby="log-in-dialog-label"
        aria-describedby="log-in-dialog-description"
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
            aria-label="cancel"
          >
            Cancel
          </button>
          <button
            className="delete"
            onClick={() => navigate(`/login/?redirectTo=${location.pathname}`)}
            aria-label="Login"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}