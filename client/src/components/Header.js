import "../styles/header.scss"

import logo from "../images/logo.jpg"
import day from "../images/day.svg"
import night from "../images/night.svg"

import dateFormater from "../helpers/dateFormater"

import User from "./User"

export default function Header() {

  const date = dateFormater()

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="expense tracker"
      />
      <div className="header__date">
        <p>
          {date}
        </p>
        <img
          src={day}
          alt="is it day or night ?"
        />
      </div>
      <User/>
    </header>
  )
}