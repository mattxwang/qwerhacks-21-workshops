# Workshop Checkpoint 2

At this point, you should have finished the ["Hooks and State in React"](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/react/main-workshop#hooks-and-state-in-react) section of the workshop.

## Edited Files

First, do the following:

```sh
$ npx create-react-app qwer-hacks
...
$ cd qwer-hacks
```

At this stage, you have modified `src/App.js` and created a new file called `src/components/Tweet.js`. They are as follows:

### App.js

```jsx
// src/App.js
import Tweet from './components/Tweet';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello QWER Hacks!
        </p>
        <Tweet author="matt" body="QWER Hacks is awesome!" />
      </header>
    </div>
  );
}

export default App;
```

### Tweet.js

```jsx
// src/components/Tweet.js
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
