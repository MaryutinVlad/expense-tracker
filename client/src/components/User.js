import "../styles/user.scss"
import { useState } from "react"
import daysCounter from "../helpers/daysCounter"


import settings from "../images/options.svg"
import defaultAvatar from "../images/defaultAvatar.png"

export default function User({profile}) {

  const [ areSettingsShown, setAreSettingsShown ] = useState(false)
  const [ userInfoClassList, setUserInfoClassList ] = useState("user__info")

  const showSettings = (e) => {
    e.target.classList.toggle("user__settings_clicked")
    setUserInfoClassList("user__info user__info_hidden")
    setTimeout(() => {
      e.target.classList.toggle("user__settings_clicked")
      setAreSettingsShown(!areSettingsShown)
      setUserInfoClassList("user__info")
    }, 300)
  }

  return (
    <div className="user">
      { areSettingsShown ? (
        <div className={userInfoClassList}>
          <button>
            change avatar
          </button>
          <button>
            change name
          </button>
        </div>
      ) : (
        <div className={userInfoClassList}>
          <img
            className="user__avatar"
            src={profile.avatar ? profile.avatar : defaultAvatar}
            alt="avatar"
          />
          <p className="user__username">
            {profile.name}
          </p>
          <p className="user__passed">
            {
            daysCounter(profile.createdOn)
            }
          </p>
        </div>
      )}
      <img
        className="user__settings"
        src={settings}
        alt="settings"
        onClick={showSettings}
      />
      
    </div>
  )
}