# Setting Up Node, and a Tour

In this (writte-only) mini-workshop, we'll cover three things:

1. Briefly, what is Node?
2. How can we set up Node on our computer?
3. What is the basic structure of a Node project?

For this mini-workshop, **you do not need to know any React**, and you don't need much experience with coding or JavaScript at all!

**Note: if you're on a windows computer, you should check the section [Using Node with Windows](#using-node-with-windows) for extra instructions.**

## Table of Contents

* [What is Node?](#what-is-node)
* [How can we set up Node on our computer?](#how-can-we-set-up-node-on-our-computer)
* [What is the basic structure of a Node project?](#what-is-the-basic-structure-of-a-node-project)
* [Using Node with Windows](#using-node-with-windows)
* [Troubleshooting](#troubleshooting)
* [Attribution](#attribution)

## What is Node?

Node.js (or Node/node) is a **runtime** for JavaScript. Basically, it's a way to run JavaScript outside of a web browser - the original use case for the language. In particular, this means that we can now use JavaScript to write webservers, command-line tools, transpilers, and all sorts of cool pieces of software! In our case, we're using Node for a few different reasons: to generate the skeleton of our React app, use many libraries, and "compile" our code at the end.

Node is much more complicated than what we just discussed here! If you're interested in learning more,

## How can we set up Node on our computer?

There are quite a few ways to install Node on your computer, and they differ depending on your operating system and how comfortable you are with your shell.

*Are you using Windows? If so, you may want to check out our [Using Node with Windows](#using-node-with-windows) section*.

If you're comfortable with package managers, you can find it [on your favourite one](https://nodejs.org/en/download/package-manager/):

```sh
$ brew install node
...
$ pkg install node
...
$ cinst nodejs.install
...
```

If you have no idea what a package manager is, that's totally okay! Instead, head to the [Node.js website](https://nodejs.org/), and download and run the "LTS" version for your operating system. As of writing, it is `14.15.3`. There should be a wizard that walks you through the installation - pretty standard stuff.

Once it's installed, you may have to restart your shell and/or computer.

To check that we've properly installed node, we can type the following commands in our shell (don't type the `$`, that just means "type this part in your shell"):

```sh
$ node -v
v14.15.3
$ npm -v
6.14.8
```

If you get numbers similar to the above example, then you're good to go. Hopefully that wasn't too hard!

**Running into problems? Peep our [Troubleshooting](#troubleshooting) tips**.

## What is the basic structure of a Node project?

Most Node projects, including the React one we'll make for the hackathon, have a predefined structure.

First, every Node project has a file called `package.json` that contains a bunch of information about the project: the creator, the version, what libraries it uses, etc. This information is then used by several tools to help build and run your project, including `npm` - the **N**ode **P**ackage **M**anager - which we'll show you how to use. The `package.json`'s file format is called JSON (**J**ava**S**cript **O**bject **N**otation), which has a bunch of "key-value pairs". For example, a super simple `package.json` might have:

```json
{
  "name": "qwerhacks",
  "version": "1.0.0"
}
```

Under the `name` key, we have the string `"qwerhacks"`; under the `version` key, we have the string `"1.0.0"`.

There's actually quite a bit that goes into a `package.json` file, and we don't have time to cover all of it today. Instead, we'll focus on two fields: the `dependencies` field, and the `scripts` field. Let's take a look at a simple React `package.json` config that we'll use:

```json
{
  "name": "teach-la-react-starter-barebones",
  "version": "0.1.0",
  "dependencies": {
    "@testing-library/jest-dom": "^5.11.6",
    "@testing-library/react": "^11.2.2",
    "@testing-library/user-event": "^12.5.0",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "react-scripts": "4.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  ...
}
```

First, `dependencies`: as the name might suggest, `dependencies` contains all of the *direct* dependencies for your app! Here, you can see that our app depends on version `"^17.0.1"` of `react` (don't worry about the `^`), `"4.0.1"` for `react-scripts`, etc.

This information is useful for us as humans, but it's also used by `npm`! In particular, if you run the command `npm install` in a folder with a `package.json`, it will look through the `dependencies` key and install all of the dependencies required. How convenient!

You may also notice that a file called `package-lock.json` exists. This keeps track of all of the dependencies that your project uses - its direct dependencies, the dependencies of those dependencies, and on and on. Typically, **you do not need to edit this file**.

When you run `npm install`, `npm` puts all of the libraries in a folder called `node_modules`. For some projects (like ours), this folder can get really big! Luckily, the contents of the folder completely match up with what's in your `package-lock.json`. In particular, that means that **you do not need to commit `node_modules`**. Instead, if you want to share your code with someone else, just tell them to run `npm install`!

Hopefully, that demystifies how dependencies work in Node. What about the `scripts` tag? Well, the `scripts` tag kind of acts like shorthand: in the above example, running

```sh
$ npm run build
...
```

is almost like running

```sh
$ react-scripts build
...
```

Except, there's one key difference: if you run the command through the `scripts` field and `npm run`, **it will use the libraries in `node_modules`**! This lets us use the exact libraries and versions needed by our project to do certain tasks, like build or test it! In our above example, you likely don't even have `react-scripts` installed globally in your shell, so that wouldn't work! Long story short, when you can, use the `scripts` instead of running the command yourself.

As a quick addendum: programmers are so lazy, that they've made `npm start` a shorthand for `npm run start`; you'll see me use them interchangeably throughout our workshops.

And that's it! If you're given a random Node project, you probably know how to use it! 95% of the time, it will look something like:

```sh
$ git clone ...
...
$ cd project
$ npm install
$ npm start
```

Happy hacking!

## Using Node with Windows

Coming soon!

## Troubleshooting

Coming soon!

## Attribution

The contents of this workshop (like the rest of this repository) are dual-licensed under the [MIT License](https://github.com/mattxwang/qwerhacks-21-workshops/blob/main/LICENSE) and the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/); feel free to use whichever license suits your purpose better.

I'd love to hear if you found this helpful, or if you have any suggestions! Please send me an email at [matt@matthewwang.me](mailto:matt@matthewwang.me).
