import "../styles/header.scss"

import logo from "../images/logo.jpg"
import day from "../images/day.svg"
import night from "../images/night.svg"

import dateFormater from "../helpers/dateFormater"

import User from "./User"

export default function Header({profile}) {

  const { formatedDate, isNight } = dateFormater()

  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="expense tracker"
      />
      <div className="header__lower-section">
        <div className="header__date">
          <p>
            {formatedDate}
          </p>
          <img
            src={isNight ? night : day}
            alt="is it day or night ?"
          />
        </div>
        <User
          profile={profile}
        />
      </div>
    </header>
  )
}