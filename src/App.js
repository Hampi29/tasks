import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TagItem from './components/TagItem'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    task: '',
    activeTag: tagsList[0].id,
    tasksList: [],
    activeRightTag: '',
    activeTagTaskList: [],
  }

  onChangeTask = event => {
    this.setState({task: event.target.value})
  }

  onChangeTag = event => {
    this.setState({activeTag: event.target.value})
  }

  onAddTask = event => {
    event.preventDefault()
    const {task, activeTag} = this.state
    const activeItem = tagsList.find(each => each.optionId === activeTag)
    const newItem = {task, tag:activeItem.displayText, tagId: activeItem.optionId}
    this.setState(prev => ({
      tasksList: [...prev.tasksList, newItem],
      task: '',
      activeTag: tagsList[0].optionId,
    }))
  }

  clickTag = optionId => {
    const {activeRightTag, tasksList} = this.state
    if (optionId !== activeRightTag) {
      const filtered = tasksList.filter(each => each.tagId === optionId)
      this.setState({activeRightTag: optionId, activeTagTaskList: filtered})
    } else {
      this.setState({activeRightTag: '', activeTagTaskList: []})
    }
  }

  render() {
    const {task, activeTag, tasksList, activeRightTag, activeTagTaskList} =
      this.state
    const isEmpty = tasksList.length === 0
    const displaylist = activeRightTag === '' ? tasksList : activeTagTaskList
    return (
      <div className="main-bg">
        <div className="left-container">
          <h1 className="heading">Create a task!</h1>
          <form onSubmit={this.onAddTask}>
            <label for="task">Task</label>
            <br />
            <input
              id="task"
              value={task}
              type="text"
              placeholder="Enter the task here"
              className="input-container"
              onChange={this.onChangeTask}
            />
            <br />
            <label for="tags">Tags</label>
            <br />
            <select
              id="tags"
              value={activeTag}
              className="input-container"
              onChange={this.onChangeTag}
            >
              {tagsList.map(each => (
                <option key={each.optionId} value={each.optionId}>{each.displayText}</option>
              ))}
            </select>
            <br />
            <button type="submit" className="add-task">
              Add Task
            </button>
          </form>
        </div>
        <div className="right-container">
          <h1>Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <TagItem
                key={each.optionId}
                tagitem={each}
                clickTag={this.clickTag}
                isActive={activeRightTag === each.optionId}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          {isEmpty ? (
            <p>No Tasks Added Yet</p>
          ) : (
            <ul className="task-list">
              {displaylist.map(each => (
                <li key={uuidv4()} className="task-item">
                  <p>{each.task}</p>
                  <p className="tag-in-task">{each.tag}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
