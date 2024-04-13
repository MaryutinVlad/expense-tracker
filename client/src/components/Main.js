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

  const groupFlags = {}

  groups.map(group => groupFlags[group.groupName] = group.groupFlag)

  const showExpenses = (filter) => {

    const expensesSummary = []
    const expensesHistory = []
    const currentMonthExpenses = expenses[expenses.length - 1]
    const subResult = {}
    let group

    if (currentMonthExpenses.date !== dateKey) {
      for (group of groups) {
        expensesSummary.push({
          groupName: group.groupName,
          groupvalue: 0
        })
      }

      return expensesSummary

    } else if (filter === "month") {

      for (let expenseIndex = currentMonthExpenses.entries.length - 1; expenseIndex >= 0; expenseIndex--) {
        const currentExpense = currentMonthExpenses.entries[expenseIndex]

        if (!subResult[currentExpense.expenseGroup]) {
          subResult[currentExpense.expenseGroup] = currentExpense.expenseValue
        } else {
          subResult[currentExpense.expenseGroup] += currentExpense.expenseValue
        }

        expensesHistory.push(currentExpense)
      }
    } else if (filter === "week") {
      
      const lastEntryDate = new Date(currentMonthExpenses.entries[currentMonthExpenses.entries.length - 1].createdOn)
      const daysToMonday = lastEntryDate.getDay()
      const dayInMilliseconds = 86400000
      const dateOfSunday = new Date(Math.round(lastEntryDate - (daysToMonday * dayInMilliseconds)))
      
      for (let expenseIndex = currentMonthExpenses.entries.length - 1; expenseIndex >= 0; expenseIndex--) {
        const currentExpense = currentMonthExpenses.entries[expenseIndex]
        const currentExpenseDate = new Date(currentExpense.createdOn)

        if (currentExpenseDate > dateOfSunday) {
          if (!subResult[currentExpense.expenseGroup]) {
            subResult[currentExpense.expenseGroup] = currentExpense.expenseValue
          } else {
            subResult[currentExpense.expenseGroup] += currentExpense.expenseValue
          }
          expensesHistory.push(currentExpense)

          if (expenseIndex === 0) {
            const previousMonthExpenses = expenses[expenses.length - 2]

            for (let extraIndex = previousMonthExpenses.entries.length - 1; extraIndex >= 0; extraIndex--) {
              const prevMonthExpense = previousMonthExpenses.entries[extraIndex]

              if (currentExpenseDate > dateOfSunday) {
                if (!subResult[prevMonthExpense.expenseGroup]) {
                  subResult[prevMonthExpense.expenseGroup] = prevMonthExpense.expenseValue
                } else {
                  subResult[prevMonthExpense.expenseGroup] += prevMonthExpense.expenseValue
                }
                expensesHistory.push(prevMonthExpense)
              } else {
                break
              }
            }
          }
        } else {
          break
        }
      }
    } else {
      const today = new Date()

      for (let expenseIndex = currentMonthExpenses.entries.length - 1; expenseIndex >= 0; expenseIndex--) {
        const currentExpense = currentMonthExpenses.entries[expenseIndex]

        if (currentExpense.createdOn === today.toLocaleDateString()) {
          if (!subResult[currentExpense.expenseGroup]) {
            subResult[currentExpense.expenseGroup] = currentExpense.expenseValue
          } else {
            subResult[currentExpense.expenseGroup] += currentExpense.expenseValue
          }
          expensesHistory.push(currentExpense)
        } else {
          break
        }
      }
    }

    for (let group of groups) {
      expensesSummary.push({
        groupName: group.groupName,
        groupvalue: subResult[group.groupName] ? subResult[group.groupName] : 0,
      })
    }

    return { expensesSummary, expensesHistory }
  }

  const { expensesSummary, expensesHistory } = showExpenses(expensesFilter)

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
          <div>
            {
              expensesHistory.map(entry => (
                <p key={entry.createdOn + entry.expenseValue}>
                  {entry.expenseValue} in <span style={{color: `${groupFlags[entry.expenseGroup]}`}}>{entry.expenseGroup}</span> on {entry.createdOn}
                </p>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}