import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { deleteTodo, updateTodo } from '../../libs/database/todo';

const styles = StyleSheet.create({
  todo: {
    display: 'flex',
    width: '300px',
    margin: '4px auto',
  },
  completed: {
    border: 0,
    padding: '8px',
  },
  text: {
    flexGrow: '10',
    padding: '0 20px',
    textAlign: 'left',
  },
  delete: {
    border: 0,
    padding: '8px',
  },
});

const Todo = ({ children, id, completed }) => (
  <div className={css(styles.todo)}>
    <button
      className={css(styles.completed)}
      onClick={() => { updateTodo(id, { completed: !completed }); }}
    >
      {completed ? 'Ø' : 'O'}
    </button>
    <input
      className={css(styles.text)}
      value={children}
      onChange={(e) => { updateTodo(id, { text: e.target.value }); }}
    />
    <button className={css(styles.delete)} onClick={() => { deleteTodo(id); }}>X</button>
  </div>
);

Todo.defaultProps = {
  children: '',
};
Todo.propTypes = {
  id: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Todo;
