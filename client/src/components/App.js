import '../styles/page.scss';
import { useState } from "react"

import Header from "./Header"
import Main from "./Main"
import Footer from "./Footer"
import Auth from "./Auth"

function App() {

  let user = JSON.parse(localStorage.getItem("expense-tracker"))

  const [ loggedIn, setLoggedIn ] = useState(Boolean(user))
  const date = new Date()

  const signUp = (userName) => {
    
    const newUser = {
      profile: {
        name: userName,
        createdOn: date.toLocaleDateString(),
        avatar: ''
      },
      expenses: []
    }

    localStorage.setItem("expense-tracker", JSON.stringify(newUser))

    setLoggedIn(true)
  }

  return (
    <div className={'page' + (loggedIn ? '' : ' login') }>
      {
        loggedIn ? (
          <>
            <Header
              profile={user.profile}
            />
            <Main
              expenses={user.expenses}
            />
            <Footer />
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
