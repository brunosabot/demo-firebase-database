import firebase from 'firebase';

export const getTodos = () => firebase.database().ref('todo') || [];
export const addTodo = (text, completed = false) => {
  const todoRef = firebase.database().ref('todo');
  const newTodoRef = todoRef.push();

  newTodoRef.set({
    text,
    completed,
  });
};
export const deleteTodo = (id) => {
  const todoRef = firebase.database().ref(`todo/${id}`);
  todoRef.remove();
};
export const updateTodo = (id, data) => {
  const updates = {};
  const keys = Object.keys(data);

  for (let i = 0; i < keys.length; i += 1) {
    updates[`/todo/${id}/${keys[i]}`] = data[keys[i]];
  }

  return firebase.database().ref().update(updates);
};
