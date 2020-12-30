# Workshop Checkpoint 1

At this point, you should have finished the ["Creating Your First Component"](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/react/main-workshop#creating-your-first-component) section of the workshop.

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
  }
  return (
    <div style={tweetStyle}>
      {props.author} says: {props.body}
    </div>
  );
}

export default Tweet;
```
