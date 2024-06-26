// Libraries
import React from "react"

export default function RoundButton(props) {

  return (
    <button className="cancel" onClick={() => props.handleCancel()}>
      {props.text}
    </button>
  )
}