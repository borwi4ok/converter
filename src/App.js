import React, { useState } from 'react'
import Input from './UI/Input'
import ResultValue from './UI/ResultValue'
import ButtonFlag from './UI/ButtonFlag'
import './App.css'

function App() {
  const [inValue, setInValue] = useState(0)
  const [startCurrency, setStartCurrency] = useState('RUB')
  const [resultCurrency, setResultCurrency] = useState('USD')
  const [currentRatio, setCurrentRatio] = useState(1)

  const [rates, setRates] = useState([
    {
      rate: 'RUB',
      isClicked: false,
    },
    {
      rate: 'USD',
      isClicked: false,
    },
    {
      rate: 'CNY',
      isClicked: false,
    },
    {
      rate: 'BRL',
      isClicked: false,
    },
    {
      rate: 'CAD',
      isClicked: false,
    },
    {
      rate: 'AUD',
      isClicked: false,
    },
    {
      rate: 'JPY',
      isClicked: false,
    },
  ])

  const [resRates, setResRates] = useState(rates)

  async function serverRequest(currencyRate, isResultArray) {
    activeClassToggle(currencyRate, isResultArray)

    const url = `https://api.exchangeratesapi.io/latest?base=${currencyRate}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Something went wrong')
    }

    const data = await response.json()

    if (isResultArray) {
      setResultCurrency(currencyRate)
      setCurrentRatio(data.rates[startCurrency])
    } else {
      setStartCurrency(currencyRate)
      setCurrentRatio(data.rates[resultCurrency])
    }
  }

  function activeClassToggle(curRate, isResultArray) {
    // should make new function for separate next conditions
    if (!isResultArray) {
      setRates((prev) => {
        const startArr = []
        prev.map((elem, index) =>
          startArr.push({ rate: elem.rate, isClicked: false })
        )
        const indexOfClickedBtn = startArr.findIndex((i) => i.rate === curRate)
        startArr[indexOfClickedBtn].isClicked = true
        return startArr
      })
    } else {
      setResRates((prev) => {
        if (isResultArray) {
          const resArr = []
          prev.map((elem, index) =>
            resArr.push({ rate: elem.rate, isClicked: false })
          )
          const indexOfClickedBtn = resArr.findIndex((i) => i.rate === curRate)
          resArr[indexOfClickedBtn].isClicked = true
          return resArr
        }
      })
    }
  }

  function checkClicked(arrOfFlags) {
    const isHave = arrOfFlags.findIndex((elem) => elem.isClicked === true)
    if (isHave === -1) return false
    else {
      return true
    }
  }

  function inputValueHandler(event) {
    setInValue(event.target.value)
  }

  return (
    <React.Fragment>
      <span className="title">Converter</span>
      <div className="wrapp">
        <div className="first-choice">
          <span>
            Choose currency <b>(from)</b>
          </span>
        </div>
        <div className="input-cont">
          {checkClicked(rates) ? (
            <Input inputValueHandler={inputValueHandler} />
          ) : (
            <span className="should-input-1">1&rarr;</span>
          )}
        </div>
        <div className="flags-cont">
          {rates.map((elem, index) => (
            <ButtonFlag
              classBtn={elem.isClicked ? elem.rate + ' active' : elem.rate}
              clickHandler={serverRequest.bind(this, elem.rate, false)}
              key={elem.rate + index}
            />
          ))}
        </div>
        <div className="second-choice">
          <span>
            Choose currency<b> (to)</b>
          </span>
        </div>
        <div className="result-cont">
          {checkClicked(resRates) ? (
            <ResultValue
              value={Math.floor(inValue * currentRatio * 100) / 100}
              resultCurrency={resultCurrency}
            ></ResultValue>
          ) : (
            <span className="should-input-2">2&rarr;</span>
          )}
        </div>

        <div className="flags-cont flags-result">
          {resRates.map((elem, index) => {
            return (
              <ButtonFlag
                classBtn={elem.isClicked ? elem.rate + ' active' : elem.rate}
                clickHandler={serverRequest.bind(this, elem.rate, true)}
                key={elem.rate + index + 10}
              />
            )
          })}
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
