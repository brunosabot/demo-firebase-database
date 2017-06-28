import React, { Component } from 'react';
import { addTodo, getTodos } from '../libs/database/todo';
import Todo from '../components/Todo';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoText: '',
      todoList: [],
    };

    this.doAddTodo = this.doAddTodo.bind(this);
    this.handleTodoText = this.handleTodoText.bind(this);
  }

  componentDidMount() {
    const todoList = getTodos();
    todoList.on('child_added', (data) => {
      this.setState({
        todoList: [
          ...this.state.todoList,
          {
            key: data.key,
            text: data.val().text,
            completed: data.val().completed,
          },
        ].sort((a, b) => (a.completed === true && b.completed === false ? 1 : -1)),
      });
    });

    todoList.on('child_removed', (data) => {
      this.setState({
        todoList: this.state.todoList
          .filter(e => e.key !== data.key)
          .sort((a, b) => (a.completed === true && b.completed === false ? 1 : -1)),
      });
    });

    todoList.on('child_changed', (data) => {
      this.setState({
        todoList: this.state.todoList
          .map(e => (e.key !== data.key ? e : {
            key: data.key,
            text: data.val().text,
            completed: data.val().completed,
          }))
          .sort((a, b) => (a.completed === true && b.completed === false ? 1 : -1)),
      });
    });
  }

  doAddTodo() {
    if (this.state.todoText !== '') {
      addTodo(this.state.todoText);
      this.setState({ todoText: '' });
    }
  }

  handleTodoText(e) {
    this.setState({ todoText: e.target.value });
  }

  render() {
    return (
      <div className="App">
        <input type="text" value={this.state.todoText} onChange={this.handleTodoText} />
        <button onClick={this.doAddTodo}>Ajouter</button>
        <div>
          {this.state.todoList.map(
            todo => (
              <Todo
                id={todo.key}
                key={todo.key}
                completed={todo.completed}
              >{todo.text}</Todo>
            ),
          )}
        </div>
      </div>
    );
  }
}

export default App;
