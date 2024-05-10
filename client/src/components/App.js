import '../styles/page.scss';
import { useState } from "react"

import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Auth from "./Auth"
import AddGroup from "./AddGroup";
import AddExpense from "./AddExpense"

function App() {

  const savedProfile = JSON.parse(localStorage.getItem("expense-tracker"))
  const [ loggedIn, setLoggedIn ] = useState(Boolean(savedProfile))
  const [ user, setUser ] = useState(loggedIn ? savedProfile : null)

  const date = new Date()
  const dateKey = String(date.getMonth() + 1) + "/" + String(date.getFullYear())

  const togglePopup = (id) => {
    document.querySelector(`#${id}`).classList.toggle("popup_hidden")
  }

  const addGroup = (groupValues) => {

    groupValues.createdOn = date.toLocaleDateString()
    
    const updatedUser = {
      profile: {
        ...user.profile,
        groups: [
          ...user.profile.groups,
          groupValues
        ]
      },
      expenses: user.expenses
    }

    localStorage.setItem("expense-tracker", JSON.stringify(user))
    setUser(updatedUser)

    togglePopup("addGroup")
  }

  const addExpense = (expenseValues) => {

    const updatedUser = {
      profile: user.profile
    }
    expenseValues.createdOn = date.toLocaleDateString()
    
    if (user.expenses[user.expenses.length - 1].date === dateKey) {

      const updatedExpenses = user.expenses

      updatedExpenses[updatedExpenses.length - 1].entries.push(expenseValues)

      updatedUser.expenses = updatedExpenses

    } else {
      updatedUser.expenses = [
        ...user.expenses,
        {
          date: dateKey,
          entries: [
            expenseValues
          ]
        }
      ]
    }

    localStorage.setItem("expense-tracker", JSON.stringify(user))
    setUser(updatedUser)

    togglePopup("addExpense")
  }

  const closeOnOverlayClick = (e, id) => {
    if (e.target === e.currentTarget) {
      togglePopup(id)
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
    setUser(newUser)

    setLoggedIn(true)
  }

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
              onOpenPopup={togglePopup}
            />
            <Footer />
            <div
              className='popup__overlay popup_hidden'
              id='addGroup'
              onClick={(e) => closeOnOverlayClick(e, "addGroup")}
            >
              <AddGroup
                onAddGroup={addGroup}
                onClosePopup={togglePopup}
              />
            </div>
            <div
              className='popup__overlay popup_hidden'
              id='addExpense'
              onClick={(e) => closeOnOverlayClick(e, "addExpense")}
            >
              <AddExpense
                groups={user.profile.groups}
                onAddExpense={addExpense}
                onClosePopup={togglePopup}
              />
            </div>
          </>
        ) : (
          <Auth
            onSignUp={signUp}
          />
        )
      }
    </div>
  );
}

export default App;
