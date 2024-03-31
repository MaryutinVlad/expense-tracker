import '../styles/page.scss';
import { useState, useEffect } from "react"

import fakeDataGenerator from '../helpers/fakeDataGenerator';

import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Auth from "./Auth"
import AddGroup from "./AddGroup";
import AddExpense from "./AddExpense"

function App() {

  let user = JSON.parse(localStorage.getItem("expense-tracker"))

  const [ loggedIn, setLoggedIn ] = useState(Boolean(user))
  const [ isGroupPopupOpened, setIsGroupPopupOpened ] = useState(false)
  const [ isExpensePopupOpened, setIsExpensePopupOpened ] = useState(false)

  const date = new Date()
  const dateKey = String(date.getMonth() + 1) + "/" + String(date.getFullYear())

  const toggleGroupPopup = () => {
    setIsGroupPopupOpened(!isGroupPopupOpened)
  }

  const toggleExpensePopup = () => {
    setIsExpensePopupOpened(!isExpensePopupOpened)
  }

  const addGroup = (groupValues) => {

    groupValues.createdOn = date.toLocaleDateString()
    user.profile.groups.push(groupValues)
    localStorage.setItem("expense-tracker", JSON.stringify(user))

    toggleGroupPopup()
  }

  const addExpense = (expenseValues) => {

    expenseValues.createdOn = date.toLocaleDateString()
    
    if (user.expenses[user.expenses.length - 1].date === dateKey) {
      user.expenses[user.expenses.length - 1].entries.push(expenseValues)
    } else {
      user.expenses.push({
        date: dateKey,
        entries: [
          expenseValues
        ]
      })
    }

    localStorage.setItem("expense-tracker", JSON.stringify(user))

    toggleExpensePopup()
  }

  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsGroupPopupOpened(false)
      setIsExpensePopupOpened(false)
    }
  }

  const signUp = (userName) => {
    
    const newUser = {
      profile: {
        name: userName,
        createdOn: date.toLocaleDateString(),
        avatar: '',
        groups: []
      },
      expenses: [
        {
          date: dateKey,
          entries: []
        }
      ]
    }

    localStorage.setItem("expense-tracker", JSON.stringify(newUser))

    setLoggedIn(true)
  }

  //console.log(fakeDataGenerator(user, 5, 4))
  user.expenses.unshift({
    date: "2/2024",
    entries: [
      {
        createdOn: "2/10/2024",
        expenseGroup: "groceries",
        expenseValue: 678
      },
      {
        createdOn: "2/15/2024",
        expenseGroup: "harmful",
        expenseValue: 1678
      },
      {
        createdOn: "2/19/2024",
        expenseGroup: "medicine",
        expenseValue: 3678
      },
    ]
  })
  user.expenses[user.expenses.length - 1].entries.push({
    
  })
  console.log(user)

  return (
    <div className={'page' + (loggedIn ? '' : ' page__login') }>
      {
        loggedIn ? (
          <>
            <Header
              profile={user.profile}
            />
            <Main
              dateKey={dateKey}
              expenses={user.expenses}
              groups={user.profile.groups}
              onAddGroup={toggleGroupPopup}
              onAddExpense={toggleExpensePopup}
            />
            <Footer />
            
          </>
        ) : (
          <Auth
            onSignUp={signUp}
          />
        )
      }
      {
        isGroupPopupOpened && (
          <div
            className='page__overlay'
            onClick={closeOnOverlayClick}
          >
            <AddGroup
              onAddGroup={addGroup}
              onClosePopup={toggleGroupPopup}
            />
          </div>
        )
      }
      {
        isExpensePopupOpened && (
          <div
            className='page__overlay'
            onClick={closeOnOverlayClick}
          >
            <AddExpense
              groups={user.profile.groups}
              onAddExpense={addExpense}
              onClosePopup={toggleExpensePopup}
            />
          </div>
        )
      }
    </div>
  );
}

export default App;
