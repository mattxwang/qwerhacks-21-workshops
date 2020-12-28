# React 101, The Main React Workshop

This README contains the notes for the entire main React workshop, **where we make a basic Twitter clone from scratch**. It is split up into five parts:

1. Hello World with React and Create React App
2. Creating Your First Component
3. Hooks and State in React
4. Common React Patterns: Lists, Forms, and Conditional Rendering
5. Using GitHub and Netlify to Deploy Your App For Free

You don't need to be an HTML/CSS/JS pro to do this workshop, but a passing familarity is recommended. If you don't have Node.js on your computer though, **we do need that** - head to "[Setting up Node.js and a quick project tour](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/react/node-setup-and-tour)" for more info there.

For every section beyond the first one, we'll also have a corresponding **checkpoint** that has all the code you need to do that section. If you fall behind or are confused, peep the checkpoints!

## Table of Contents

## Hello World with React and Create React App

### Setting Everything Up

Today, we'll be using React to create a ____, which is a good example of a frontend application. We're also going to use a library called [Create React App](https://github.com/facebook/create-react-app), which makes developing React apps *really* easy.

Okay, let's get started! First, we need to do some project setup; open up your terminal application (Powershell on Windows, Terminal on OSX; if you're using Linux, you should know already), and run:

```sh
$ npx create-react-app qwer-hacks
...
$ cd qwer-hacks
$ npm start
```

What did we just do?

* `npx create-react-app` is a command that creates a template application from [Create React App](https://github.com/facebook/create-react-app), which is a project boilerplate commonly used for React apps. It creates a folder (in this case, `qwer-hacks`), and installs a bunch of stuff in it!
* `cd` is the terminal command that changes the folder you're in; here, we're entering the `qwer-hacks` folder that we just made.
* `npm start` tells Node to "start" our project. More info in "[Setting up Node.js and a quick project tour](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/react/node-setup-and-tour)"

After running `npm start`, you should get a message like this:

```sh
$ npm start
Compiled successfully!

You can now view qwer-hacks in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://x.x.x.x:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

Usually, it'll open your browser to your app; if it doesn't, visit whatever address follows "Local" in your browser (it's usually [http://localhost:3000/](http://localhost:3000/)).

You should get a screen like this:

TODO IMAGE

### Hello World

As is customary, let's write a hello world message! The splash tells us to edit `src/App.js`, so let's do that!

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello QWER Hacks!
        </p>
      </header>
    </div>
  );
}

export default App;
```

One convenient thing is that `create-react-app` automatically refreshes your page every time you make a change to your app's code; it just makes life *that* much easier. So, if we head to our new page:

TODO IMAGE GOES HERE

In due time, we'll get to explaining every part of this file! But for now, let's take it step-by-step.

For now, let's establish that `App()` - which is a function - is also a *component*. This word has a special meaning in React, which we'll explore in a bit! What's important for now is that all components return something called **JSX**, which is what this function is returning.

Whatever gets returned by a *component* is what gets displayed on the page; our `App` component controls our entire site!

If you're familiar with HTML, this looks ... almost exactly like it! In fact, JSX is like HTML, but on superpowers. Almost all HTML is valid JSX; the only exceptions are:

* instead of `class`, you must use `className` - this is because `class` is a keyword in JavaScript
* the `style` tag works a little differently - TODO
* a component must return just one JSX element! not two or more!

However, JSX has quite a few superpowers. The most relevant for us is the `{}`, which let us run JavaScript inside our code! Here are some examples:

```jsx
// src/App.js
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello QWER Hacks!
        </p>
        <p>
          Nine plus ten is {9 + 10}.
        </p>
        <p>
          A random number between 0 and 1: {Math.random()}
        </p>
        <p>
          The best hackathon is {"qwer hacks".toUpperCase()}
        </p>
      </header>
    </div>
  );
}
```

Sharp observers might notice that we also used the braces in the image tag, with `src={logo}`. What's going on there?

```jsx
// src/App.js
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
...
```

Well, `logo` is a global variable; we've imported it from `logo.svg`, which is a file in our project folder. We'll use this syntax again later (and explain it, so no worries), but you should be thinking: there are some JSX superpowers at play here!

Similar to global variables, you can also use local variables; we will be doing a lot of this in this project!

```jsx
// src/App.js
function App() {
  let coolestHackathon = "QWER Hacks!";
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {coolestHackathon}
        </p>
      </header>
    </div>
  );
}
```

And that's it for the barebones basics! Let's do a quick recap of what we've covered:

* functions in React can represent **components**
* components return **JSX**, which is mostly like HTML
* in JSX, using `{}` lets you evaluate JavaScript

If you haven't copied the code for this section, don't worry about it! We'll start fresh in the next section.

## Creating Your First Component

One of the immediate strengths of React is that you can create your own components, and use them to simplify your project. In designing our Twitter clone, we'll want to think about it in the lens of components.

Let's start simple: the "unit" of our Twitter clone is a Tweet. So, let's start by creating a Tweet component, in a new file (`src/components/Tweet.js`):

```jsx
// src/components/Tweet.js

function Tweet() {
  return (
    <div>
      This is a Tweet!
    </div>
  );
}

export default Tweet;
```

We've created a super simple component that returns a `<div>`. However, note that we've also added this `export default` business - what does that mean?

When we export a module (in this case, our component), we let other files import it. And who'd want to import our Tweet? Probably our `App` component!

Head back to `src/App.js`; cutting out some of the fluff from the previous section, adjust it to

```jsx
// src/App.js
import Tweet from './src/components/Tweet';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Hello QWER Hacks!
        </p>
        <Tweet />
      </header>
    </div>
  );
}

export default App;
```

Notice that we've imported the `Tweet` component from our `src/components/Tweet.js` file (leaving off the `.js` is fine), and we've used it like an HTML tag with `<Tweet />`.

And you'll see, our Tweet has been rendered to the screen!

TODO IMAGE

Hm, that's not so useful though, is it! But, it turns out that we can create **custom properties** for our component, or `props`.

For our first iteration, let's say we need to know just two things for a Tweet:

1. the `@` of the author - let's call this `author`
2. the actual Tweet body - let's call this `body`

Now, adjust your `App.js` to have:

```jsx
...
<Tweet author="matt" body="QWER Hacks is awesome!">
```

And ... nothing happened. That's because we need to tell our `Tweet` component what to do with these properties!

Head back to our `Tweet` component. Given that functions and components seem somewhat interchangeable, it'd be natural to assume that the **properties** passed to the component are like **arguments** for a function. And you would be correct to assume that!

```jsx
// src/components/Tweet.js

function Tweet(props) {
  return (
    <div>
      {props.author} says: {props.body}
    </div>
  );
}
...
```

In React, custom components are passed all of their properties in one object; *we've chosen* to call it `props` (out of custom), but you can name it whatever you want. And, as you can see, we're *accessing* two parts of `props`: the `author`, and the `body`, and rendering them.

Okay, and does it work?

TODO IMAGE

Wow, nice! We've made our very first, simple component. As a quick recap, we covered:

* creating your own component
* importing and using a component
* accessing the properties of a component

## Hooks and State in React

## Common React Patterns: Lists, Forms, and Conditional Rendering

## Using GitHub and Netlify to Deploy Your App For Free

## Resources & Attributions

[Matt](https://matthewwang.me) has taught some variant of this workshop (among other React-related ones) several times before; past iterations include:

* [QWER Hacks 2020's Intro to Web Dev with React and Firebase](https://github.com/malsf21/qwerhacks-web-dev-workshop)
* [Learning Lab Crash Course: Intro to React](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/07-intro-react)
* [Learning Lab Crash Course: Intermediate React](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/09-intermediate-react-1)
* [Learning Lab Crash Course: React Hooks](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/11-react-hooks)
* [Learning Lab Crash Course: Misc DevOps](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/14-misc-devops)

The contents of this workshop (like the rest of this repository) are dual-licensed under the [MIT License](https://github.com/malsf21/qwerhacks-21-workshops/blob/main/LICENSE) and the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/); feel free to use whichever license suits your purpose better.

I'd love to hear if you found this helpful, or if you have any suggestions! Please send me an email at [matt@matthewwang.me](mailto:matt@matthewwang.me).
