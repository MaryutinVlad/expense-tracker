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
      <div className="main__expenses">
        <div>
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
              </div>
            ))
          }
        </div>
        <div>
          <h4>
            History
          </h4>
            {
              expensesHistory.map(({ expenseGroup, expenseValue, createdOn }) => (
                <p key={createdOn + expenseValue}>
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