import "../styles/user.scss"

import settings from "../images/options.svg"

export default function User() {
  return (
    <div className="user">
      <img
        className="user__avatar"
        src=""
        alt="avatar"
      />
      <p className="user__username">
        username
      </p>
      <img
        className="user__settings"
        src={settings}
        alt="settings"
      />
      <p className="user__passed">
        passed: 12d
      </p>
    </div>
  )
}