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
    return db.collection("tweets")
      .orderBy("date", "desc")
      .onSnapshot((snapshot) => {
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
    db.collection("tweets").doc()
      .set({
        author: username,
        body: newTweetText,
        date: Date.now(),
        likes: 0,
      })
      .catch((error) => {
          console.error("Error adding document: ", error);
      });
  }

  const createUser = (newUsername) => {
    setUsername(newUsername);
  }

  const incrementLike = (id) => {
    const tweetRef = db.collection("tweets").doc(id);
    db.runTransaction((transaction) => {
      return transaction.get(tweetRef).then((doc) => {
        if (!doc.exists){
          console.error("document doesn't exist!");
        }
        else {
          const newLikes = doc.data().likes + 1;
          transaction.update(tweetRef, {likes: newLikes});
        }
      })
    }).catch(function(error) {
      console.log("Transaction failed: ", error);
    });
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
            return <Tweet
              author={tweet.author}
              body={tweet.body}
              likes={tweet.likes}
              addLike={() => incrementLike(tweet.id)}
              key={tweet.id} />
          })
        }
      </header>
    </div>
  );
}

export default App;
