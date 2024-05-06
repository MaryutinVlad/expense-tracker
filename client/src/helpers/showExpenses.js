export default function showExpenses(filter, expenses, groups, dateKey) {

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

    return { expensesSummary, expensesHistory }

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