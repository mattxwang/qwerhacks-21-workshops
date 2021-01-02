# React 101, The Main Firebase Workshop

This README contains the notes for the entire main Firebase workshop, where **we make a client-side todo list app persistent and multi-user**. It is split up into several byte-sized chunks:

0. What is Firebase/Firestore and Demo Code Tour
1. Setting up Firestore and the Firebase Console
2. Creating, Reading, Updating, and Deleting Data with Firestore
3. Listeners, Transactions, Querying

You don't need to be an HTML/CSS/JS pro to do this workshop, but a passing familarity is recommended.

For every section, we'll also have a corresponding **checkpoint** that has all the code you need to do that section. If you fall behind or are confused, peep the checkpoints! We also start with some template code (as this workshop isn't about HTML/CSS/JS), so please check that out first.

This workshop is meant to be web framework agnostic, so we implement everything in vanilla JavaScript. Everything we cover is generally extendable to any frontend framework. We cover React in a bonus part of the workshop!

## Table of Contents

* [What is Firebase/Firestore and Demo Code Tour](#what-is-firebasefirestore-and-demo-code-tour)
  * [What is Firebase?](#what-is-firebase)
  * [A Bit More on Firestore and Some Vocab](#a-bit-more-on-firestore-and-some-vocab)
  * [The Demo Code](#the-demo-code)
* [Setting up Firestore and the Firebase Console](#setting-up-firestore-and-the-firebase-console)
  * [Creating a Project](#creating-a-project)
  * [Registering a Firebase Web App](#registering-a-firebase-web-app)
  * [Firestore Setup](#firestore-setup)
* [Basic Data Operations (CRUD) in Firestore](#basic-data-operations-crud-in-firestore)
  * [Creating Sample Data](#creating-sample-data)
  * [Basic Read Operations](#basic-read-operations)
  * [Creating Data Programatically](#creating-data-programatically)
  * [Deleting Data](#deleting-data)
  * [Updating Data](#updating-data)
* [Cool Tricks with Firestore: Listeners, Transactions, Querying](#cool-tricks-with-firestore-listeners-transactions-querying)
  * [Listeners](#listeners)
  * [Transactions](#transactions)
  * [Querying](#querying)
* [Conclusion and Next Steps](#conclusion-and-next-steps)
* [Licensing, Attribution, and Resources](#licensing-attribution-and-resources)

## What is Firebase/Firestore and Demo Code Tour

### What is Firebase?

[Firebase](https://firebase.google.com/) is a "comprehensive app development platform" designed to make developers' lives easier. Specifically, it implements a lot of common back-end functionalities for you (like database management, user authentication, analytics, hosting, monitoring, and testing).

Today, we'll use **Cloud Firestore**, which is a database scheme and manager provided by Firebase. It simplifies a huge (and I really mean huge) part of making apps. In particular, it is **document-based** (rather than SQL-like), which is a concept that we'll delve into in a moment.

For us, Firebase itself will manage deploying and hosting the database server; we'll use Firebase's JavaScript library to communicate with that server. In the next section, I'll walk you through how to set up a Firebase app that uses Firestore.

Firebase is a product that's sold by Google, though many of its supporting libraries are open-source. For most small projects (and likely, your hackathon project), Firebase and Firestore are completely free to use. You can see more on Firebase's [pricing page](https://firebase.google.com/pricing); you're likely going to be using the Spark Plan.

### A Bit More on Firestore and Some Vocab

*Feel free to skip this part if you're not particularly interested in the technical backgorund of things!*

Let's take a look at what the [**Cloud Firestore**](https://firebase.google.com/products/firestore) site says:

> Cloud Firestore is a NoSQL document database that lets you easily store, sync, and query data for your mobile and web apps - at global scale.

If you're unfamiliar with databases, this is a scary sentence! Let's take some time and unpack what each of these words mean.

First, the general database stuff:

* a **database** is just a structured way to store some **data**. Data could be text (strings), numbers, and even complicated objects like analytics data or images.
* **SQL** is a language used to manage something called a *relational database*. SQL is very powerful and is a very complicated topic; we'll oversimplify and say that it's basically a set of tables. SQL power users, don't get mad!
* **NoSQL** databases are ... non-SQL, and typically non-relational databases. To continue our oversimplificiation, we'll say that data is structured less *rigidly* than tables.
* **document databases** are a type of NoSQL database! In particular, the *unit* for data collections are **documents**: sets of keys and values that describe both the structure and the content of the data. Contrast this to a table, where each row has the same column values.

What about the operations on data?

* **storing** data in this case refers to **persistence**. When we "save" our data, we can be sure that it'll be there, even after the user closes our app. Complicated apps run into many complex problems when storing lots of data!
* **syncing** data makes sure that everybody is on the same page when data is changed. This sounds like a simple problem, but gets complicated as your app has more users, more servers, and complex operations.
* **querying** data means sifting through a database to find the right data. Sometimes, it's very simple, like "give me all the data!!!". In other instances, it can be complex: "give me the first five Tweets by date that mention Rina Sawayama and were retweeted by somebody you follow".

With that in mind, what's the problem that Firestore aims to solve? I'd categorize it into two, distinct problems:

1. **In general, managing a database is lots of work.** You have to deploy a server, deal with security, update the software, and troubleshoot bugs. **Firestore does this all for you**, so you can focus on making your app!
2. **Scaling databases is particularly hard.**

### The Demo Code

It's a bit tricky to explain how to use Firestore without an existing app. Since the scope of this workshop *is not how to make a web-app*, I'm not going to directly cover it in this workshop.

Instead, we're going to start with a sample app, which in this case, is a very barebones to-do list. You can [play around with a live demo here](https://raw.githack.com/malsf21/qwerhacks-21-workshops/main/firebase/main-workshop/starter-code/index.html), or take a peek at the [starter-code folder and README](https://github.com/malsf21/qwerhacks-21-workshops/tree/main/firebase/main-workshop/starter-code). In the video for this section, I also briefly step through the code - but it's not too important for the meat of this workshop.

A few notes about this app:

* don't worry about understanding *all* of the code! we won't be touching most of it, and I'll explain the relevant parts in due time. I also hope that I named and commented things well enough!
* it is written in just vanilla JavaScript. In other words, we aren't using anything like React. This is so I can focus on explaining Firestore *without* also having to explain React, Angular, etc. You can easily take what we do and extend it to those frameworks!
* if you're particularly interested on using Firestore with React, I've also written an addendum to this workshop that takes the app we made in the React 101 workshop, and adds in Firestore. Take a look! TODO
* as an aside, this is *not* the most efficient way to write a to-do list in vanilla JS. I intentionally chose it this way (i.e. FP + entire-list regeneration on every iteration) since this is *most similar* to how hackathon projects are written (in my humble opinion). Please don't take this as gospel!

Of course, if there's something that you don't understand, or you find a bug - feel free to let me know! You can always email me at [matt@matthewwang.me](mailto:matt@matthewwang.me), or use the mentor channel at QWER Hacks.

Ok, let's get started!
## Setting up Firestore and the Firebase Console

Before we do any coding, we first need to set up our project through Firebase. As Firebase is a Google product, *you have to have a Google account* for the rest of this workshop. Unfortunately, there's no getting around that.

We also assume that **you've already downloaded the demo project**. If you haven't, please do that now!
### Creating a Project

First, head to [the Firebase homepage](https://firebase.google.com/). You can hit the "Get Started" or "Go to console" button, they do the same thing.

TODO

You'll be presented with either a list of projects, or a wizard. If you're on a list, hit the "Add project" button.

TODO

We can name our project whatever you want!

TODO

For the sake of this tutorial, I won't enable Google Analytics (since it requires more setup). However, it's a useful tool if you're looking to explore!

Once you finish that, your project should be all set up! But, we've got to do a bit more configuration: for the Firebase app, and for Firestore.

### Registering a Firebase Web App

Once you make your project, you'll probably be taken to a page like this. Hit the button to add a web application to your project.

TODO

Once you're in the menu, we'll go through a few options, First, register your app with a nickname. It's not insanely important what it will be, but we'll use it in our configuration.

In our case, we're not going to deploy/host with Firebase. However, it's a useful tool!

Now, we're going to be taken to an "Add Firebase SDK" page. It'll give us some code that's actually a bit useful. Copy that code to your clipboard...

TODO

... and we'll put it in our app! In particular, head to `index.html`, and bop it in at the end of the `<body>` tag, but above the `app.js` script tag:

```html
  ...
  </body>
  TODO
  <script src="app.js"></script>
</html>
```

Normally, you won't commit API keys to GitHub repos, but with Firebase things are a bit different - since your app is entirely in the frontend, there is no way to properly obscure the key. Firebase instead ensures secure data through its [security rules](https://firebase.google.com/docs/firestore/security/overview).

We'll get back to using this in a moment. For now, let's finish our Firestore setup!

### Firestore Setup

Head to the Cloud Firestore page in your project, and hit Create database.

TODO

We can choose to run in test mode - at this point in our app, unauthorized access is unlikely, and things aren't going to spiral out of control. However, security rules are important!

TODO

Next, we'll have to pick a data centre location. I'm in Los Angeles, California, so I'm going to pick something in the `us-west*` range. You can pick whichever region suits you best - keep in mind that many of our judges are on the west coast!

TODO

Cool, now our Firestore has been officially set up!

We can now move on to doing some ~ app work ~!!!

## Basic Data Operations (CRUD) in Firestore

**CRUD** - **creating, reading, updating, and deleting** - is a really common set of database operations. So, we'll start off with walking through those operations with Firestore, through the lens of our to-do app. By the end of this section, we'll make our basic app functionality fully persistent!

We'll also start having checkpoints at the end of each section, just in case!

### Creating Sample Data

### Basic Read Operations

### Creating Data Programatically

### Deleting Data

### Updating Data

## Cool Tricks with Firestore: Listeners, Transactions, Querying

Now that we've nailed the basic CRUD operations, I think we should take a look at some of the cooler features that Firestore offers. Each of these can make your project just *that* much more powerful! We'll also use this as an opportunity to polish off the rest of our app's functionality.

### Listeners

### Transactions

### Querying

## Conclusion and Next Steps

## Licensing, Attribution, and Resources

[Matt](https://matthewwang.me) has taught some variant of this workshop (among other React-related ones) several times before; past iterations include:

* [QWER Hacks 2020's Intro to Web Dev with React and Firebase](https://github.com/malsf21/qwerhacks-web-dev-workshop)
* [Learning Lab Crash Course: Intro to Firebase](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/18-firebase)


He's also got a few favourite external sources, including:

* [the official Firestore docs](https://firebase.google.com/docs/firestore)
* Reed Barger's [Firestore Tutorial](https://www.freecodecamp.org/news/the-firestore-tutorial-for-2020-learn-by-example/) on freeCodeCamp

The contents of this workshop (like the rest of this repository) are dual-licensed under the [MIT License](https://github.com/malsf21/qwerhacks-21-workshops/blob/main/LICENSE) and the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/); feel free to use whichever license suits your purpose better.

I'd love to hear if you found this helpful, or if you have any suggestions! Please send me an email at [matt@matthewwang.me](mailto:matt@matthewwang.me).
