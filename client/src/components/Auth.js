import "../styles/auth.scss"

export default function Auth({onSignUp}) {

  let userName = ""

  const signUp = (e) => {

    e.preventDefault()

    onSignUp(userName)
    
    userName = ""
  }

  const trackValue = (e) => {
    userName = e.target.value
  }

  return (
    <div
      className="container"
    >
      <h2>
        Expense tracker authorization
      </h2>
      <p>
        A proper authorization is not yet implemented.
        All user related data stored locally 
        and only user name is required for signing up.
      </p>
      <form 
        className="container__form"
        onSubmit={signUp}
      >
        <input
          type="name"
          placeholder="user name"
          onChange={trackValue}
          required
        />
        <button type="submit">
          sign up
        </button>
      </form>
    </div>
  )
}