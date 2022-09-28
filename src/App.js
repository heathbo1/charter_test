import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  const [data, setData] = useState(null)

  const getData = async (filePath) => {
    const response = await fetch(filePath)
    const data = await response.json()
    return data
  }

  useEffect(() => {
    if (!data) {
      getData('data.json').then((response) => {
        setData(response)
      })
    }
  })

  const totalValues = []

  const calculateValue = (amount) => {
    var finalValue = 0
    if (amount > 50) {
      // 1 point for every dollar spent over 50
      finalValue = finalValue + (amount - 50)
    }
    if (amount > 100) {
      finalValue = finalValue + (amount - 100) * 2
    }

    return finalValue
  }

  const saveData = (name, value) => {
    const found = totalValues.find((element) => element.name === name)
    if (!found) {
      totalValues.push({ name: name, value: value })
    } else {
      const index = totalValues.findIndex((element) => element.name === name)
      totalValues[index].value = totalValues[index].value + value
    }
  }

  const getDom = () => {
    if (data) {
      return Object.entries(data).map(([key, value]) => {
        return (
          <div className="month" key={key}>
            <div className="label">{key}</div>
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(value).map(([name, amount]) => {
                  saveData(name, amount)
                  return (
                    <tr key={name} className="table">
                      <td style={{ borderRight: '1px solid #000000' }}>{name}</td>
                      <td style={{ borderRight: '1px solid #000000' }}>{`$${amount}`}</td>
                      <td>{calculateValue(amount)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )
      })
    }
  }

  return (
    <div className="App">
      <div className="panel">
        <div>{getDom()}</div>
        <div>
          <div className="label">Totals</div>
          <table className="table">
            <tr>
              <th>Name</th>
              <th>Points</th>
            </tr>
            <tbody>
              {totalValues.map((value) => {
                return (
                  <tr>
                    <td>{value.name}</td>
                    <td>{calculateValue(value.value) - 500}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default App
