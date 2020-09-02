import React from 'react'
import './Input.css'

export default function Input({ inputValueHandler }) {
  return (
    <input
      type="number"
      placeholder="Input value"
      onChange={inputValueHandler}
    ></input>
  )
}
