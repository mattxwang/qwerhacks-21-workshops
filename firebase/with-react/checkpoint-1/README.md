# Checkpoint 1

Starting from `starter-code`, we need to install firebase, create `firebase.js`, and edit the relevant component files (`App.js`):

## install

```sh
$ npm install --save firebase
...
# or if you like yarn
$ yarn add firebase
```

## firebase.js

```js
// src/firebase.js
import firebase from 'firebase';

const config = { // this is the same thing as `firebaseConfig`
    // THIS SHOULD BE YOUR CONFIG! NOT WHAT'S IN THIS FILE
    apiKey: "AIzaSyDI63SyY4DQTUvURl7vG7cl3lgpJ4LYbcc",
    authDomain: "qwerhacks-react-firestore.firebaseapp.com",
    projectId: "qwerhacks-react-firestore",
    storageBucket: "qwerhacks-react-firestore.appspot.com",
    messagingSenderId: "605077934185",
    appId: "1:605077934185:web:7b6556b4d4ee533adf12f8"
};

firebase.initializeApp(config);

export default firebase;
```

## App.js

```jsx
import { useEffect, useState } from 'react';
import firebase from './firebase';
import ComposeTweet from './components/ComposeTweet';
import Tweet from './components/Tweet';
import UserCreation from './components/UserCreation';
import './App.css';

const db = firebase.firestore();

function App() {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState("");

  const setupFirestoreListener = () => {
    return db.collection("tweets").onSnapshot((snapshot) => {
      const tweets = snapshot.docs.map((doc) => {
        return {...doc.data(), id: doc.id}
      });
      setTweets(tweets);
    },
    (error) =>
      console.error("Error getting documents: ", error));
  }
  useEffect(setupFirestoreListener, []);

  const createTweet = (newTweetText) => {
    const newTweets = [...tweets];
    newTweets.push({
      author: username,
      body: newTweetText,
    });
    setTweets(newTweets);
  }

  const createUser = (newUsername) => {
    setUsername(newUsername);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Hello {username !== "" && username}!</p>
        {
          username === "" ?
            <UserCreation createUser={createUser} /> :
            <ComposeTweet createTweet={createTweet} />
        }
        {
          tweets.map((tweet) => {
            return <Tweet author={tweet.author} body={tweet.body} key={tweet.id}  />
          })
        }
      </header>
    </div>
  );
}

export default App;
```
