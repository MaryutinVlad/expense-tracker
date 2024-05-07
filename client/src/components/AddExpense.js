import "../styles/popup.scss"

export default function AddGroup({
  groups,
  onAddExpense,
  onClosePopup
}) {

  const expenseValues = {
    expenseGroup: groups[0].groupName,
    expenseValue: 0
  }

  const addExpense = (e) => {
    e.preventDefault()
    expenseValues.expenseValue = Number(expenseValues.expenseValue)
    onAddExpense(expenseValues)
  }

  const trackValues = (e) => {
    expenseValues[e.target.id] = e.target.value
  }

  const closePopup = () => {
    onClosePopup("addExpense")
  }

  return (
    <div className="popup">
      <div className="popup__upper-section">
        <h3>
          Add expense
        </h3>
        <button
          type="button"
          onClick={closePopup}
        >
          X
        </button>
      </div>
      <form
        onSubmit={addExpense}
      >
        <label htmlFor="expenseGroup">
          Select group
        </label>
        <select
          id="expenseGroup"
          onChange={trackValues}
        >
          {
            groups.map(group => (
              <option
                key={group.groupName}
                style={{ color: `${group.groupFlag}`}}
              >
                {
                  group.groupName
                }
              </option>
            ))
          }
        </select>
        <label htmlFor="expenseValue">
          Value
        </label>
        <input
          type="number"
          id="expenseValue"
          onChange={trackValues}
          required
        />
        <button
          type="submit"
        >
          Save
        </button>
      </form>
    </div>
  )
} 