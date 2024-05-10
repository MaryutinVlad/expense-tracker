import "../styles/main.scss"
import showExpenses from "../helpers/showExpenses"
import runningNumbers from "../helpers/runningNumbers"
import historyDateFormater from "../helpers/historyDateFormater"

import { useState } from "react"

export default function Content({
  dateKey,
  expenses,
  groups,
  onOpenPopup
}) {

  const [ expensesFilter, setExpensesFilter ] = useState("month")

  const openPopup = (id) => {
    onOpenPopup(id)
  }

  const changeFilter = (e) => {
    setExpensesFilter(e.target.value)
  }

  const groupFlags = {}

  groups.map(group => groupFlags[group.groupName] = group.groupFlag)

  const { expensesSummary, expensesHistory } = showExpenses(expensesFilter, expenses, groups, dateKey)
  const expensesTotal = expensesSummary.reduce(((accum, cur) => accum + cur.groupValue), 0)

  return (
    <div className="main">
      <div className="main__buttons">
        <button
          type="button"
          onClick={() => openPopup("addGroup")}
        >
          Add group
        </button>
        <button
          type="button"
          onClick={() => openPopup("addExpense")}
        >
          Add expense
        </button>
      </div>
      <div className="main__content">
        <div className="main__expenses">
          <h4>
            Expenses this
            <select onChange={changeFilter}>
              <option value="month">
                month
              </option>
              <option value="week">
                week
              </option>
              <option value="day">
                day
              </option>
            </select>
          </h4>
          {
            expensesSummary.map(({ groupName, groupValue }) => (
              <div key={groupName}>
                <span style={{ color: `${groupFlags[groupName]}`}}>{groupName} </span>
                <span id={groupName}>{runningNumbers(groupValue, groupName, 50, 10)}</span>
                <span id={`${groupName}-perc`}>{runningNumbers((groupValue / expensesTotal).toFixed(3) * 100, `${groupName}-perc`, 50, 10)}</span>
              </div>
            ))
          }
          <div key="total">
                <span style={{ color: "#ff0000"}}>total </span>
                <span id="total">{runningNumbers(expensesTotal, "total", 50, 10)}</span>
              </div>
        </div>
        <div className="main__history">
          <h4>
            History
          </h4>
            {
              expensesHistory.map(({ expenseGroup, expenseValue, createdOn }) => (
                <p key={createdOn + expenseValue + Math.floor(Math.random() * 100)}>
                  {expenseValue} in <span style={{color: `${groupFlags[expenseGroup]}`}}>{expenseGroup} </span>
                  {
                    expensesFilter !== "day" && (
                      <>
                        {historyDateFormater(createdOn)}
                      </>
                    )
                  }
                </p>
              ))
            }
        </div>
      </div>
    </div>
  )
}