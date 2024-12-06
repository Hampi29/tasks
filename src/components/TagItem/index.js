import './index.css'

const TagItem = props => {
  const {tagitem, clickTag, isActive} = props
  const {displayText, optionId} = tagitem
  const btnClass = isActive ? 'active-tag-btn' : 'tag-btn'
  const onClickTag = () => {
    clickTag(optionId)
  }
  return (
    <li className="tag-item">
      <button type="button" className={btnClass} onClick={onClickTag}>
        {displayText}
      </button>
    </li>
  )
}

export default TagItem
