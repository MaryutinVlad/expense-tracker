import '../styles/page.scss';
import { useState } from "react"

import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Auth from "./Auth"
import AddGroup from './AddGroup';

function App() {

  let user = JSON.parse(localStorage.getItem("expense-tracker"))

  const [ loggedIn, setLoggedIn ] = useState(Boolean(user))
  const [ isGroupPopupOpened, setIsGroupPopupOpened ] = useState(false)

  const date = new Date()

  const toggleGroupPopup = () => {
    setIsGroupPopupOpened(!isGroupPopupOpened)
  }

  const addGroup = (groupValues) => {

    user.profile.groups.push(groupValues)
    localStorage.setItem("expense-tracker", JSON.stringify(user))

    toggleGroupPopup()
  }

  const closeOnOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsGroupPopupOpened(false)
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
      expenses: []
    }

    localStorage.setItem("expense-tracker", JSON.stringify(newUser))

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
              expenses={user.expenses}
              groups={user.profile.groups}
              onAddGroup={toggleGroupPopup}
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
    </div>
  );
}

export default App;
