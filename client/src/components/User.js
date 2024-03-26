import defaultAvatar from "../images/testIcon.png"
import "../styles/user.scss"
import daysCounter from "../helpers/daysCounter"

import settings from "../images/options.svg"

export default function User({profile}) {
  return (
    <div className="user">
      <img
        className="user__avatar"
        src={profile.avatar ? profile.avatar : defaultAvatar}
        alt="avatar"
      />
      <p className="user__username">
        {profile.name}
      </p>
      <img
        className="user__settings"
        src={settings}
        alt="settings"
      />
      <p className="user__passed">
        {
          daysCounter(profile.createdOn)
        }
      </p>
    </div>
  )
}