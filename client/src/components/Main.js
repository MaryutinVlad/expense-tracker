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
          groupvalue: 0
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
    }

    for (let group of groups) {
      expensesToShow.push({
        groupName: group.groupName,
        groupvalue: subResult[group.groupName] ? subResult[group.groupName] : 0
      })
    }
    
    return expensesToShow
  }

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
            //console.log(showExpenses(expensesFilter))
            /*showExpenses().map(group => (
              <div key={group.groupName}>
                {group.groupName} {group.groupvalue}
              </div>
            ))*/
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