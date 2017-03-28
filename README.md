`memoize.js` is a lib that would enhance the functions with **memoization**. It will return the **last result** if the arguments are not changed. If you need to cache the arguments every time you can check [this lib](https://github.com/addyosmani/memoize.js).

`memoize.js` comes from [this thought](https://github.com/reactjs/reselect/issues/221).

# Install

```bash
> npm install memoize.js
```

Or

```bash
> bower install memoize.js
```

Or

```html
<script src='memoize.js'></script>
```

# Usage

```javascript
var fn = memoize(function(a, b) {
  console.log('calculate: ', a, b);
  return Math.pow(a, b);
})

fn(2, 3); // calculate
fn(2, 3); // from cache
fn(2, 4); // calculate
fn(2, 3); // calculate
```

# You may not need [reselect](https://github.com/reactjs/reselect)

## `containers/VisibleTodoList.js`

```javascript
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

In the above example, `mapStateToProps` calls `getVisibleTodos` to calculate `todos`. This works great, but there is a drawback: `todos` is calculated every time the component is updated. If the state tree is large, or the calculation expensive, repeating the calculation on every update may cause performance problems. Reselect can help to avoid these unnecessary recalculations.

## Creating a Memoized Function

Just wrap `getVisibleTodos` with `memoize()`, you can get the advantage. Simple and Clear.

## `containers/VisibleTodoList.js`

```javascript
import memoize from 'memoize'
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/TodoList'

// Just wrap this function with `memoize()`
const getVisibleTodos = memoize((todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
  }
})

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList
```

# License

Released under an MIT license.