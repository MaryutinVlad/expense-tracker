import "../styles/popup.scss"

export default function AddGroup({
  onAddGroup,
  onClosePopup
}) {

  const groupValues = {
    groupName: '',
    groupFlag: ''
  }

  const addGroup = (e) => {
    e.preventDefault()
    onAddGroup(groupValues)
  }

  const trackValues = (e) => {
    groupValues[e.target.id] = e.target.value
  }

  const closePopup = () => {
    onClosePopup()
  }

  return (
    <div className="popup">
      <div className="popup__upper-section">
        <h3>
          Add group
        </h3>
        <button
          type="button"
          onClick={closePopup}
        >
          X
        </button>
      </div>
      <form onSubmit={addGroup}>
        <div className="popup__input-field">
          <label htmlFor="groupName">
            Group name:
          </label>
          <input
            type="name"
            id="groupName"
            placeholder="tomato chips"
            onChange={trackValues}
            required
          />
        </div>
        <div className="popup__input-field">
          <label htmlFor="groupFlag">
            Flag:
          </label>
          <input
            type="color"
            id="groupFlag"
            onChange={trackValues}
            required
          />
          <button
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
} 