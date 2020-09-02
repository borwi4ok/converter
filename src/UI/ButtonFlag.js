import React from 'react'
import './ButtonFlag.css'

export default function ButtonFlag({ classBtn, clickHandler }) {
  return <div className={classBtn} onClick={clickHandler}></div>
}
