import "../styles/main.scss"
import showExpenses from "../helpers/showExpenses"
import historyDateFormater from "../helpers/historyDateFormater"

import { useState } from "react"

export default function Content({
  dateKey,
  expenses,
  groups,
  onAddGroup,
  onAddExpense
}) {

  const [ expensesFilter, setExpensesFilter ] = useState("month")

  const addGroup = () => {
    onAddGroup()
  }

  const addExpense = () => {
    onAddExpense()
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
          onClick={addGroup}
        >
          Add group
        </button>
        <button
          type="button"
          onClick={addExpense}
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
            expensesSummary.map(group => (
              <div key={group.groupName}>
                <span style={{ color: `${groupFlags[group.groupName]}`}}>{group.groupName}</span> {group.groupvalue}
              </div>
            ))
          }
        </div>
        <div>
          <h4>
            History
          </h4>
            {
              expensesHistory.map(entry => (
                <p key={entry.createdOn + entry.expenseValue}>
                  {entry.expenseValue} in <span style={{color: `${groupFlags[entry.expenseGroup]}`}}>{entry.expenseGroup} </span>
                  {
                    expensesFilter !== "day" && (
                      <>
                        {historyDateFormater(entry.createdOn)}
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