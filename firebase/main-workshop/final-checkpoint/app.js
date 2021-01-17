'use strict'

const db = firebase.firestore();

const todoInput = document.getElementById('todo-input');
const todoContainer = document.getElementById('todo-container');
const doneAll = document.getElementById('done-all');
const nahAll = document.getElementById('nah-all');
let globalTodos = []; // rip, global state :(

// pure functions
// these are both functionally pure,
// and also won't be touched in the workshop!

// creates a JSON object representing a todo
const createTodoObject = (text, complete, id) => {
  return {text, complete, id};
}

// helper to make a new todo
const newTodoObject = (text) => {
  return createTodoObject(text, false, Date.now() + text);
}

// creates a 'DOM string' from a todo object
const createTodoString = (todo) => {
  // if only we had JSX :'(
  const {text, complete, id} = todo;
  const statusStr = complete ? 'text-strikethrough' : '';
  return `
  <li>
    <span class="todo-text ${statusStr}">${text}</span>
    <span>
      <button class="action-button done-button" id="done-${id}">👌 done</button>
      <button class="action-button nah-button" id="nah-${id}">🤷 nah</button>
    </span>
  </li>
  `
}

// flips the complete status of one todo
const flipTodoStatus = (todo) => {
  return {...todo, complete: !todo.complete };
}

// toggles the complete status for just one todo
const toggleTodoStatus = (todos, id) => {
  return todos.map((todo) => {
    return todo.id === id ? flipTodoStatus(todo) : todo;
  });
}

// removes one todo from our list (by id)
const removeTodo = (todos, id) => {
  return todos.filter((todo) => todo.id !== id);
}

// "regenerates" all of the todos from our todos array
const generateTodos = todos => {
  return todos.map(createTodoString).join('');
}

// completes all todos

const completeAllTodos = todos => {
  return todos.map(todo => {
    return {...todo, complete: true}
  });
}

// impure functions
// all of these functions have side effects
// we'll modify quite a few of these during the workshop

// what we do when we click the done button
// now uses firestore!
const onDoneClick = (todo) => {
  db.collection("todos").doc(todo.id)
    .update({complete: !todo.complete})
    .catch(function(error) {
      console.error("Error updating document: ", error);
    });
}

// what we do when we click the nah button
// now uses firestore!
const onNahClick = (id) => {
  db.collection("todos").doc(id).delete()
    .catch((error) =>  {
      console.error("Error removing document: ", error);
    });
}

// completes all the todos!
// now with firestore!
const onDoneAll = () => {
  const batch = db.batch();
  db.collection("todos")
    .where("complete", "==", false)
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const todoRef = db.collection("todos").doc(doc.id)
        batch.update(todoRef, {"complete": true})
      })
    })
    .then(() => batch.commit()
      .catch((error) => console.error("Error on batch write: ", error)))
    .catch((error) => console.error("Error getting documents: ", error));
}

// resets (deletes) all todos!
// now uses firestore!
const onNahAll = () => {
  const batch = db.batch();
  db.collection("todos").get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) =>
        batch.delete(db.collection("todos").doc(doc.id)))
    })
    .then(() => batch.commit()
      .catch((error) => console.error("Error on batch write: ", error)))
    .catch((error) => console.error("Error getting documents: ", error));
}

// generates the listeners for every done and nah button
// is this inefficient? maybe ;)
const generateListeners = todos => {
  todos.forEach(todo => {
    document.getElementById(`done-${todo.id}`).onclick = () => onDoneClick(todo);
    document.getElementById(`nah-${todo.id}`).onclick = () => onNahClick(todo.id);
  });
}

// our event listener for the text box, which adds a todo
// when the user hits enter with a non-empty input value
// now uses firestore!
const handleTodoInput = (event) => {
  // why this? see https://stackoverflow.com/questions/11365632/how-to-detect-when-the-user-presses-enter-in-an-input-field
  if (!event) event = window.event;
  const keyCode = event.code || event.key;
  const text = todoInput.value;
  if (keyCode == 'Enter' && text !== "") {
    const newTodo = newTodoObject(text);
    db.collection("todos").doc(newTodo.id).set(newTodo)
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    todoInput.value = "";
  }
}

todoInput.onkeypress = handleTodoInput;
doneAll.onclick = onDoneAll;
nahAll.onclick = onNahAll;

db.collection("todos").onSnapshot(
  (snapshot) => {
    const todos = snapshot.docs.map((doc) => doc.data());
    todoContainer.innerHTML = generateTodos(todos);
    generateListeners(todos);
  },
  (error) => console.error("Error getting documents: ", error));
