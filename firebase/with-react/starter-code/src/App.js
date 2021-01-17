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
            <ComposeTweet createTweet={createTweet} />
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
