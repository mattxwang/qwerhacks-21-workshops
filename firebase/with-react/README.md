# Using Firestore with React: the `useEffect` hook

This README contains a bonus workshop that combines React and Firestore to create a full-stack-ish web app. We transform the Twitter clone we built in the [React 101 workshop](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/react/main-workshop) with the skills we picked up in the [Cloud Firestore workshop](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/firebase/main-workshop). In particular, **we assume you have done both of these workshops**.

The main focus of this workshop is using the `useEffect` hook to allow for Firestore operations as "side effects", and reconfiguring the state in the `App` component to rely completely on Cloud Firestore.

This file is broken up into several pieces, but the content is all filmed in one-shot.

## Table of Contents

* [The Main Content](#the-main-content)
  * [Remarks](#remarks)
  * [Creating and Configuring Firebase, Firestore](#creating-and-configuring-firebase-firestore)
  * [Brainstorming our Data](#brainstorming-our-data)
  * [Creating a Listener with useEffect](#creating-a-listener-with-useeffect)
  * [Creating Tweets](#creating-tweets)
  * [Updating Tweets and Refactoring](#updating-tweets-and-refactoring)
* [Conclusion and Next Steps](#conclusion-and-next-steps)
* [Licensing, Attribution, and Resources](#licensing-attribution-and-resources)

## The Main Content

### Remarks

**Warning**: we assume that you've already done both the [React 101 workshop](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/react/main-workshop) and the [Cloud Firestore workshop](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/firebase/main-workshop). We will **skip over things done in these workshops, so please take a look at them first!!**

We will start with the code at the end of the react workshop; for your convenience, we've included it in the `starter-code` folder of this workshop.

### Creating and Configuring Firebase, Firestore

First, we need to set up Firebase and Firestore again. Generally, you'll just follow the [Setting up Firestore and the Firebase Console](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/firebase/main-workshop#setting-up-firestore-and-the-firebase-console) tutorial: register a firebase web app, then set up firestore. We're just going to do one step differently.

In that tutorial, we were given some config files and CDN links; what we did was put this:

```html
  ...
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

We're going to approach this a little differently for our react app!

First, instead of including the JS SDK with a `<script>` tag, we're going to import Firebase and Firestore with `npm` (or `yarn`) instead. In the `starter-code` folder, type one of these commands in your shell:

```sh
$ npm install --save firebase
...
# or if you like yarn
$ yarn add firebase
```

This tells our package manager to install the `firebase` library. Every time we want to use `firebase`, we're going to `import` it - but more on that later.

The other thing we need to do is add our firebase configuration object somewhere. I think the best way to do this is to create a common object in a file. Make a new file called `src/firebase.js`:

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

Normally, you won't commit API keys to GitHub repos, but with Firebase things are a bit different - since your app is entirely in the frontend, there is no way to properly obscure the key. Firebase instead ensures secure data through its [security rules](https://firebase.google.com/docs/firestore/security/overview).

And that's it! Then, we're ready to get started.

### Brainstorming our Data

Before we write any code, it's always good to think about the data we're going to store, and how that's formatted.

In our case, I think this makes the most sense:

* have a collection called `tweets`
* each `tweet` should have an `author` and `body`, like our starter code; both should be strings
* each `tweet` should keep track of its `likes`; this should be a number (note right now, our tweets do not do this!)
* each `tweet` should have the date, so we can sort them by date (note this is a new feature)

We'll build out the rest of this as our app chugs along. Let's get started coding!

### Creating a Listener with `useEffect`

Since we already know the time of behaviour we want for our app (a listener to update our state), we can do that off the bat (without doing a single read).

To do this, let's change how our `App.js` works. First, let's remove our default Tweets.

```jsx
// src/App.js
function App() {
  const [tweets, setTweets] = useState([]);
  const [username, setUsername] = useState("");
  ...
```

Next, let's import firebase at the top of `App.js`:

```jsx
// src/App.js
import { useState } from 'react';
import firebase from './firebase';
import ComposeTweet from './components/ComposeTweet';
...
```

And make a database reference as a top-level constant:

```jsx
// src/App.js
const db = firebase.firestore();
function App() {
  ...
```

Now, what we want to do is:

* the **first time** the app loads, establish a connection with the Firestore server
* **every time** there's an update, update the state using `setTweets()` function
* when our app closes, **shut down the connection**

React has one tool that lets us do that! This tool is called the `useEffect` hook, and to be honest, it's a bit confusing. We'll explain it via example:

First, let's import it:

```jsx
// src/App.js
import { useEffect, useState } from 'react';
```

Now, we're going to use the hook. Bear with me for a moment:

```jsx
// src/App.js
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
```

Wow, this also looks super scary. What's going on here?

First, let's focus on `setupFirestoreListener()`. It's a function that:

* calls `db.collection().onSnapshot()`, setting up an event listener
* on every time the `tweets` collection changes, we map each `tweet` to an objec that contains all of its fields, plus its `id` (we'll use this later)
* then, we use the `setTweets` part of `useState` to update our state
* if there are errors on the Firestore read, we `.catch` them

Okay, so what exaclty does `.onSnapshot()`, and therefore `setupFirestoreListener()` return? It actually returns another function that *cleans up* (or detaches) our Firestore listener. It's good practice to detach things once we don't need them anymore - like when the user closes our app.

Last but not least, we have the `useEffect` hook being called. This one little line actually does a few things:

* it calls `setupFirestoreListener` when the component is first created
* it calls `setupFirestoreListener` again every time any item in the second array is updated. since it is the empty array, **this never happens**.
* it calls what `setupFirestoreListener` **returns** when the component is about to be removed (e.g. the page is closed)

Hopefully, this makes sense! The `useEffect` hook is, in my opinion, one of the more confusing parts of React. If you'd like to read more, I'd recommend the [Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html) docs page!

Let's also now properly resolve the key error we get on list-generated components; that's a one-line fix:

```jsx
// src/App.js
{
  tweets.map((tweet) => {
    return <Tweet author={tweet.author} body={tweet.body} key={tweet.id} />
  })
}
```

And, you'll notice that this works! If you add a Tweet in the Firestore console, like this:

![image of matt manually adding a Tweet in the Firestore console](./images/firestore-console-add.png)

It'll show up!!

![image of matt's tweet showing up on the screen](./images/tweet-shown.png)

The setup was a bit tedious, but note that the actual business logic was pretty simple to implement: because we already centralized all of our app data to React's state, *all we needed to do was change the state*!

We'll notice that some other additions are equally as easy, if not easier!

As a quick recap, we:

* imported `firebase` and `useEffect`
* wrote our own function `setupFirestoreListener` that establishes a snapshot listener to update our state, and also a cleanup function
* uses the effect hook to call `setupFirestoreListener()` only once
* updates `<Tweet />` renders to use a `key`

**Checkpoint 1**: TODO

### Creating Tweets

The next thing we need to do is create tweets. This is pretty simple, but note that we need to do things:

* first, we need to push our data to Firestore *instead* of state
* secondly, we need to adjust our data scheme for the `id` and the `likes` fields we're adding

Note that we don't need to update Firestore **and** state at the same time, since our listener already handles that for us!

Let's do both of those steps in one:

```jsx
function App(){
  ...
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
  ...
}
```

Hopefully, this is pretty intuitive; step-by-step, we are creating a document (with an auto-generated ID) with an `author`, `body` (as normal), a `date` (which we'll use for sorting), and a `likes` count. We also have a `.catch()` to see if there are any errors!

For now, this should work; however, there's a problem you might encounter: we're not sorting the tweets by date! There are actually two approaches we can use to solve this problem:

* sort them on the Firestore request
* sort them after we receive them, i.e. client-side

For the sake of this workshop, let's do the former. We can do that with Firestore's `.order()` function; editing our effect hook:

```jsx
// src/App.js
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
```

The `.orderBy()` function lets you order all queries by a field (`date`) and in a direction (`desc` for descending). Nothing else changes!

![matt is able to add new tweets, and they show up in order!](./images/working-order.gif)

Great! Again, modifying our logic wasn't too tricky, as we designed things well with React in the first place. Let's take one more thing (updating the likes properly).

As a quick recap, we:

* changed the `createTweet` function to send the new tweet to firestore instead
* use `.orderBy` to order the rendered tweets by date published

**Checkpoint 2**: TODO

### Updating Tweets and Refactoring

This last portion - syncing the likes with firestore - is slightly frustrating, for two reasons:

1. we didn't design our `Tweet` component to take in `likes` as a `prop`, nor did we deal with `setLikes` in the same way
2. what happens if a like count changes in-between the read and the write?

We can solve the first problem with a quick refactor.

First, let's pass down `likes`:

```jsx
// src/App.js
{
  tweets.map((tweet) => {
    return <Tweet
      author={tweet.author}
      body={tweet.body}
      likes={tweet.likes}
      key={tweet.id} />
  })
}
```

We can now remove the state dependency for `Tweet`; eventually, even the update button will call a Firestore function:

```jsx
// src/components/Tweet.js
function Tweet(props) {
  const tweetStyle = {
    border: "1px solid white",
    padding: "1em",
    marginTop: "1em"
  };
  const addLike = () => null;
  return (
    <div style={tweetStyle}>
      <p>
        {props.author} says: {props.body}
      </p>
      <p>
        number of likes: {props.likes}
      </p>
      <button onClick={addLike}>+1!</button>
    </div>
  );
}

export default Tweet;
```

Let's now solve the latter half of the first part, and the second problem with something called a Firestore **transaction**. Long story short, **transactions** (which are like batched writes) can make multiple database actions happen all-at-once or not-at-all, which prevents our race condition from happening.

We'll make a generic function in `App.js`, and then pass it down to each `Tweet`:

```jsx
// src/App.js

function App() {
  ...
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
```

What does `incrementLike` do? It's a bit confusing, but here's a quick go:

* `tweetRef` is a reference to the tweet we want to update
* we use `db.runTransaction` to pair our read and update in the same go
* if the document doesn't exist, we throw an error
* if not, we first get the likes, then add 1, and run the transaction

We then pass `incrementLike` with the specific `id` to the component.

Finally, just edit the `Tweet` component:

```jsx
// src/components/Tweet.js
<button onClick={props.addLike}>+1!</button>
```

And, it works!

![matt is likes a tweet that says spurthi is great, because she is](./images/transaction.gif)

It's a bit slower than the instantaneous state update, especially because transactions are particularly slow. This is an interesting tradeoff: you could just update with your current value, which is much faster (but loses accuracy), or use a transaction, and sacrifice speed. This is a design decision that you'll have to make!

And that's it! We've completely converted our existing state-based application to now also use Firestore.

The last checkpoint is [here, if you'd like](#TODO).

## Conclusion and Next Steps

And that's it! I'll admit that we're not exactly using Firestore to its full potential here, but note that implementing other features - like user authentication, retweeting, image tweets, etc. - all become easy to implement when we're able to separate the business logic, database ops, and design.

Hopefully, this helps! As always, please reach out to us if y'all have any questions. Excited to see your amazing project :)

## Licensing, Attribution, and Resources

[Matt](https://matthewwang.me) has taught some variant of this workshop (among other React-related ones) several times before; past iterations include:

* [QWER Hacks 2020's Intro to Web Dev with React and Firebase](https://github.com/malsf21/qwerhacks-web-dev-workshop)
* [Learning Lab Crash Course: Intro to Firebase](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/18-firebase)

He's also got a few favourite external sources, including:

* [the official Firestore docs](https://firebase.google.com/docs/firestore)
* Reed Barger's [Firestore Tutorial](https://www.freecodecamp.org/news/the-firestore-tutorial-for-2020-learn-by-example/) on freeCodeCamp

The contents of this workshop (like the rest of this repository) are dual-licensed under the [MIT License](https://github.com/malsf21/qwerhacks-21-workshops/blob/main/LICENSE) and the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/); feel free to use whichever license suits your purpose better.

I'd love to hear if you found this helpful, or if you have any suggestions! Please send me an email at [matt@matthewwang.me](mailto:matt@matthewwang.me).
