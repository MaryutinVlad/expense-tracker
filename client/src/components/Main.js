import "../styles/main.scss"

export default function Content({
  expenses,
  groups,
  onAddGroup
}) {

  const addGroup = () => {
    onAddGroup()
  }

  return (
    <div className="main">
      <div className="main__buttons">
        <button  onClick={addGroup}>
          Add group
        </button>
        <button>
          Add expense
        </button>
      </div>
      <div className="main__expenses">
        <div>
          {
            groups.map(group => (
              <div key={group.groupName}  style={{ color: `${group.groupFlag}`}}>
                {group.groupName}
              </div>
            ))
          }
        </div>
        <div>

        </div>
      </div>
    </div>
  )
}