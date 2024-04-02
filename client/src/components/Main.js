import "../styles/main.scss"

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

  const showExpenses = (filter) => {

    const expensesToShow = []
    const currentMonthExpenses = expenses[expenses.length - 1]
    const subResult = {}
    let group

    if (currentMonthExpenses.date !== dateKey) {
      for (group of groups) {
        expensesToShow.push({
          groupName: group.groupName,
          groupvalue: 0,
          groupFlag: group.groupFlag
        })
      }

      return expensesToShow

    } else if (filter === "month") {

      for (let expense of currentMonthExpenses.entries) {
        if (!subResult[expense.expenseGroup]) {
          subResult[expense.expenseGroup] = expense.expenseValue
        } else {
          subResult[expense.expenseGroup] += expense.expenseValue
        }
      }
    } else if (filter === "week") {
      const lastEntryDate = new Date(currentMonthExpenses.entries[currentMonthExpenses.entries.length - 1].createdOn)
      
      /*for ( let daysToMonday = lastEntryDate.getDay(); daysToMonday > 0; daysToMonday-- ) {

      }*/
    }
    const lastEntryDate = new Date(currentMonthExpenses.entries[currentMonthExpenses.entries.length - 1].createdOn)
    const daysToMonday = lastEntryDate.getDate()
    const dayInMilliseconds = 86400000
    const dateOfMonday = new Date(Math.round(lastEntryDate - (daysToMonday * dayInMilliseconds)))
    console.log(dateOfMonday.toLocaleDateString())

    for (let group of groups) {
      expensesToShow.push({
        groupName: group.groupName,
        groupvalue: subResult[group.groupName] ? subResult[group.groupName] : 0,
        groupFlag: group.groupFlag
      })
    }

    return expensesToShow
  }

  console.log()

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
            showExpenses(expensesFilter).map(group => (
              <div key={group.groupName}>
                <span style={{ color: `${group.groupFlag}`}}>{group.groupName}</span> {group.groupvalue}
              </div>
            ))
          }
        </div>
        <div>
          <h4>
            History
          </h4>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}