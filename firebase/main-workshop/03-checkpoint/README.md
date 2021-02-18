# Firebase 101 Workshop Checkpoint #3

At this point, you should've completed ["Deleting Data"](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#deleting-data).

## Files

We assume that you've set up Firestore as described in the ["Setting up Firestore and the Firebase Console"](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#setting-up-firestore-and-the-firebase-console).

We do not touch `style.css` in this workshop! And `index.html` is the same for every single section.

## app.js

```js
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
const onDoneClick = (id) => {
  globalTodos = toggleTodoStatus(globalTodos, id);
  regenerateTodos();
}

// what we do when we click the nah button
// now uses firestore!
const onNahClick = (id) => {
  db.collection("todos").doc(id).delete()
    .then((_) => regenerateTodos())
    .catch((error) =>  {
      console.error("Error removing document: ", error);
    });
}

// completes all the todos!
const onDoneAll = () => {
  globalTodos = completeAllTodos(globalTodos);
  regenerateTodos();
}

// resets (deletes) all todos!
const onNahAll = () => {
  globalTodos = [];
  regenerateTodos();
}

// generates the listeners for every done and nah button
// is this inefficient? maybe ;)
const generateListeners = todos => {
  todos.forEach(todo => {
    document.getElementById(`done-${todo.id}`).onclick = () => onDoneClick(todo.id);
    document.getElementById(`nah-${todo.id}`).onclick = () => onNahClick(todo.id);
  });
}

// regenerates our todos from scratch (rather than updating by id)
// now uses firestore!
const regenerateTodos = () => {
  db.collection("todos").get()
    .then((snapshot) => {
      const todos = snapshot.docs.map((doc) => doc.data());
      todoContainer.innerHTML = generateTodos(todos);
      generateListeners(todos);
    })
    .catch((error) => console.error("Error getting documents: ", error));
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
      .then((_) => regenerateTodos())
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
    todoInput.value = "";
  }
}

todoInput.onkeypress = handleTodoInput;
doneAll.onclick = onDoneAll;
nahAll.onclick = onNahAll;
regenerateTodos();
```

## index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>to do, or not to do</title>

    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <div id="app-container">
      <div class="text-center">
        <h1>to do, or not to do</h1>
        <input id="todo-input" type="text" placeholder="what do you feel like doing today?"/>
        <div>
          <button class="action-button done-button" id="done-all">👌 done all</button>
          <button class="action-button nah-button" id="nah-all">🤷 nah all</button>
        </div>
      </div>
      <ul id="todo-container"></ul>
    </div>
    <footer class="text-center">
      <p>
        by <a class="link" href="https://matthewwang.me" target="_blank" rel="noopener noreferrer">matt</a>
        for the <a class="link" href="https://www.qwerhacks.com/" target="_blank" rel="noopener noreferrer">QWER Hacks 2021</a> <a class="link" href="https://www.qwerhacks.com/" target="_blank" rel="noopener noreferrer">firebase workshop</a>
        with ✨ 💖 🌈
      </p>
    </footer>
    <!-- The core Firebase JS SDK is always required and must be listed first -->
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>

    <!-- REMEMBER TO COPY THIS TOO -->
    <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-firestore.js"></script>

    <script>
      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyCX0DiU1APY-nob9Wbp7fDs7fT3_F9l9eQ",
        authDomain: "qwer-hacks-firebase-21.firebaseapp.com",
        projectId: "qwer-hacks-firebase-21",
        storageBucket: "qwer-hacks-firebase-21.appspot.com",
        messagingSenderId: "353018754103",
        appId: "1:353018754103:web:189774aeb8caae2d843bb2"
      };
      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);
    </script>

    <script src="app.js"></script>
  </body>
</html>

```
