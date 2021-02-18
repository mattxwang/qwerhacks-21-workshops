# Workshop Checkpoint 5 (Final Checkpoint)

At this point, you should have finished the ["Conditional Rendering"](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#conditional-rendering) subsection of ["Common React Patterns"](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#common-react-patterns-lists-forms-and-conditional-rendering) in the workshop.

## Edited Files

First, do the following:

```sh
$ npx create-react-app qwer-hacks
...
$ cd qwer-hacks
```

At this stage, you have modified `src/App.js` and created three new files: `src/components/Tweet.js`, `src/components/ComposeTweet.js`, and `src/components/UserCreation.js`. They are as follows:

### App.js

```jsx
// src/App.js
import { useState } from 'react';
import ComposeTweet from './components/ComposeTweet';
import Tweet from './components/Tweet';
import UserCreation from './components/UserCreation';
import './App.css';

const defaultTweets = [
  {
    author: "matt",
    body: "QWER Hacks is awesome!",
  },
  {
    author: "sharvani",
    body: "arjun is the coolest bean of all time :heart:",
  },
  {
    author: "arjun",
    body: "no u <3",
  },
];

function App() {
  const [tweets, setTweets] = useState(defaultTweets);
  const [username, setUsername] = useState("");

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
            <ComposeTweet createTweet={createTweet} />
        }
        {
          tweets.map((tweet) => {
            return <Tweet author={tweet.author} body={tweet.body} />
          })
        }
      </header>
    </div>
  );
}

export default App;
```

### ComposeTweet.js

```jsx
// src/components/ComposeTweet.js
import {useState} from 'react';

function ComposeTweet(props) {
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const composeTweet = () => {
    props.createTweet(text);
    setText("");
  }
  return (
    <div>
      <p>write your own tweet</p>
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={composeTweet}>create</button>
    </div>
  )
}

export default ComposeTweet;
```

### Tweet.js

```jsx
// src/components/Tweet.js
import {useState} from 'react';

function Tweet(props) {
  const tweetStyle = {
    border: "1px solid white",
    padding: "1em",
    marginTop: "1em"
  };
  const [likes, setLikes] = useState(0);
  const addLike = () => setLikes(likes + 1);
  return (
    <div style={tweetStyle}>
      <p>
        {props.author} says: {props.body}
      </p>
      <p>
        number of likes: {likes}
      </p>
      <button onClick={addLike}>+1!</button>
    </div>
  );
}

export default Tweet;
```

### UserCreation.js

```jsx
// src/components/UserCreation.js
import {useState} from 'react';

function UserCreation(props) {
  const [text, setText] = useState("");
  const handleInput = (e) => {
    setText(e.target.value);
  }
  const createUser = () => {
    props.createUser(text);
    setText("");
  }
  return (
    <div>
      <p>introduce yourself</p>
      <input type="text" onChange={handleInput} value={text} />
      <button onClick={createUser}>create</button>
    </div>
  )
}

export default UserCreation;
```
