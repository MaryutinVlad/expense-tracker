import "../styles/main.scss"

export default function Content({
  expenses,
  groups,
  onAddGroup,
  onAddExpense
}) {

  const addGroup = () => {
    onAddGroup()
  }

  const addExpense = () => {
    onAddExpense()
  }

  return (
    <div className="main">
      <div className="main__buttons">
        <button
          type="button"
          onClick={addGroup}
        >
          Add group
        </button>
        <button
          type="button"
          onClick={addExpense}
        >
          Add expense
        </button>
      </div>
      <div className="main__expenses">
        <div>
          <h4>
            Groups
          </h4>
          {
            groups.map(group => (
              <div key={group.groupName}  style={{ color: `${group.groupFlag}`}}>
                {group.groupName}
              </div>
            ))
          }
        </div>
        <div>
          <h4>
            History
          </h4>
          <div>

          </div>
        </div>
      </div>
    </div>
  )
}