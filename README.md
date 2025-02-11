# 🏳️‍🌈 QWER Hacks '21 Workshops (React, Firebase, Education Track)

Hey there! These are written notes, code demos, and video links for the workshops I ([Matt](https://matthewwang.me), he/him) ran at [QWER Hacks '21](https://www.qwerhacks.com/) - on React, Firebase, and the Education Track! Feel free to poke around if you're interested!

If you've got any questions, feel free to ping me - either as a mentor in the hackathon, or in general by email at [matt@matthewwang.me](mailto:matt@matthewwang.me).

## Table of Contents

* [Workshop Legend](#workshop-legend)
  * [React](#react)
  * [Firebase (Cloud Firestore)](#firebase-cloud-firestore)
  * [Education Track](#education-track)
* [FAQs](#faqs)
  * [Where can I find videos?](#where-can-i-find-videos)
  * [What do I need to know to take X workshop?](#what-do-i-need-to-know-to-take-x-workshop)
  * [I'm a bit stuck on my project during the hackathon. Can I get help?](#im-a-bit-stuck-on-my-project-during-the-hackathon-can-i-get-help)
  * [I've got a question on a topic that's not directly covered in a tutorial. Where should I look for help?](#ive-got-a-question-on-a-topic-thats-not-directly-covered-in-a-tutorial-where-should-i-look-for-help)
  * [Who is Matt?](#who-is-matt)
* [Resources and Thanks](#resources-and-thanks)
* [Licensing](#licensing)

## Workshop Legend

This repository has a lot of stuff going on! For your convenience, here are all of the workshop materials, divided up by topic.

### React

The React 101 core workshop; this is what you need to get your project up and running, and learn the basics of React! This is broken up into bite-sized chunks, where each chunk is ~ 5-8 minutes.

0. [Setting up Node.js and a quick project tour](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/node-setup-and-tour) (written)
1. [Hello World with React and Create React App](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#hello-world-with-react-and-create-react-app)
2. [Creating Your First Component](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#creating-your-first-component)
3. [Hooks and State in React](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#hooks-and-state-in-react)
4. [Lists](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#lists)
5. [Forms](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#forms-and-passing-down-functions)
6. [Conditional Rendering](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#conditional-rendering)
7. [Using GitHub and Netlify to Deploy Your App For Free](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/main-workshop#using-github-and-netlify-to-deploy-your-app-for-free)

[Here's the YouTube playlist for the videos in order, for your convenience](https://www.youtube.com/playlist?list=PLPO7_kXilXFbpznCbpni9fjg7MKU7lyKS).

Some bonus content! Feel free to check these out if they interest you, but you might not need them for your project.

* [Should I use React in my hackathon project?](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/should-i-use-react)
* [Using Firestore with React: the `useEffect` hook](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/with-react)

### Firebase (Cloud Firestore)

The "actual" workshop; here, we take a simple vanilla JS app and integrate Firebase. Similar to the React videos, the workshop is broken up into small chunks!

0. [Setting up Firestore and the Firebase Console](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#setting-up-firestore-and-the-firebase-console)
1. [Basic Data Operatins (CRUD) in Firestore](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#basic-data-operations-crud-in-firestore):
    * [Creating Sample Data](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#creating-sample-data) and [Reading it](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#basic-read-operations)
    * Programatically [Creating](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#creating-data-programatically), [Deleting](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#deleting-data), and [Updating](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#updating-data) Data
2. [Cool Tricks with Firestore](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#cool-tricks-with-firestore-listeners-transactions-querying)
    * [Listeners](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#listeners)
    * [Batched Writes](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#batched-writes)
    * [Querying](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/main-workshop#querying)

[Here's the YouTube playlist for the videos in order, for your convenience](https://www.youtube.com/playlist?list=PLPO7_kXilXFb0_hrPKxlx-UEhZHiiTEWY).

And an extra goodie:

* [Using Firestore with React: the `useEffect` hook](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/firebase/with-react)

### Education Track

I did the video intro for the education track! You [watch the video](https://www.youtube.com/watch?v=KhtwVRjKosg) or read [a rough outline of my script](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/education-track).

## FAQs

### Where can I find videos?

There are two places you can find videos of the workshop! The first is on the Tikkl page for hackers (you would've received these links when you registered); the workshops are livestreamed at certain times in the day.

The second is on ACM at UCLA's YouTube channel. In particular,

* [The React 101 playlist](https://www.youtube.com/playlist?list=PLPO7_kXilXFbpznCbpni9fjg7MKU7lyKS)
* [The Firestore 101 playlist](https://www.youtube.com/playlist?list=PLPO7_kXilXFb0_hrPKxlx-UEhZHiiTEWY)
* [The Education Track video](https://www.youtube.com/watch?v=KhtwVRjKosg)


### What do I need to know to take X workshop?

For both the React and Firestore workshops, I do assume that you've seen *a little bit* of HTML and CSS, and have used a programming language before. If it's JavaScript, that helps, but syntactically it's pretty similar to most other languages you might've encountered (e.g. C++, Python, Java).

If you haven't used HTML and CSS before, it's not the worst deal in the world, but we'd recommend that you brush up on those first! Check out Interneting Is Hard's [Basic Web Pages](https://www.internetingishard.com/html-and-css/basic-web-pages/) and [Hello, CSS](https://www.internetingishard.com/html-and-css/hello-css/) tutorials for a quick read, or maybe [ACM Hack's Intro HTML/CSS](https://www.youtube.com/watch?v=sttIgSTnSg0) for a longer watch.

If the JavaScript portion of the React workshop confused you, it may be worth spending a bit of time catching up on that first! For a short-ish read, Javascript.info's [JavaScript Fundamentals](https://javascript.info/first-steps) are solid, as is Lisa Tagliaferri and Tania Rascia's [How To Code in JavaScript series](https://www.digitalocean.com/community/tutorial_series/how-to-code-in-javascript); for a longer watch, check out [ACM Hack's Intro to JS](https://www.youtube.com/watch?v=Dk9kob-9Wkw).

### I'm a bit stuck on my project during the hackathon. Can I get help?

Yup! QWER Hacks '21 is doing mentorship through Discord this year! If you need help, bop into voice chat or text channels - a mentor (or quite a few) will be there to help you out!

### I've got a question on a topic that's not directly covered in a tutorial. Where should I look for help?

Good question! Luckily for us, the internet has tons of great resources, including Google! If a quick Google isn't super helpful, consider:

* poking around the official docs: [here are React's](https://reactjs.org/docs/getting-started.html) (which are quite solid), and [here are Firestore's](https://firebase.google.com/docs/firestore).
* skimming other tutorials: [React has a great official tutorial](https://reactjs.org/tutorial/tutorial.html), and [Firebase's](https://firebase.google.com/docs/web/setup) is alright too. [Tania Rascia has a great React tutorial too](https://www.taniarascia.com/getting-started-with-react/)!
* use [StackOverflow](https://stackoverflow.com/)! There's no shame, and it's likely that many others have run into your problem too!
* ask us! QWER Hacks has a mentor system through Discord, and quite a few of the mentors are experienced in React, Firebase/Firestore, and web development!

### Who is Matt?

Glad you asked! I ([Matt](https://matthewwang.me)) am a third-year CS & Math-Econ major at UCLA, and the current president of [ACM Teach LA](https://teachla.uclaacm.com). I'm really passionate about education, technology, and their intersection - which is something that I love doing at QWER Hacks and Teach LA! I'm also particularly passionate about making tech a more diverse and welcoming place, which is an issue that definitely needs some work. I spend a lot of time working on EdTech, training developers, and doing mentorship - feel free to ask me about that!

In terms of experience, I'm definitely not an absolute professional, but I've done quite a bit of web development over the years! I've worked with React in a variety of contexts - in a startup, in a mid-sized company, at a big tech company, and in personal projects. I've used Firebase (and Firestore) at ACM Teach LA and in personal projects. More broadly, I've done stuff all over the stack:

* web design with Photoshop, Figma
* frontend javascript: React, Angular, jQuery, typical vanilla JS, many libraries!
* backend-adjacent: webservers with Python (Flask, Django), PHP, Java
* databases: SQL, Firebase/Firestore/RTDB, some MongoDB
* misc: git(hub), CI/CD (GitHub Actions, Netlify, Travis CI, AppVeyor), Electron

If you've got questions about these things, or more broadly anything related to web development, feel free to hit me up through the mentor channels at QWER Hacks!

## Resources and Thanks

[Matt](https://matthewwang.me) has taught a few variants of these workshops before; past iterations include:

* [QWER Hacks 2020's Intro to Web Dev with React and Firebase](https://github.com/mattxwang/qwerhacks-web-dev-workshop)
* [Learning Lab Crash Course: Intro to React](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/07-intro-react)
* [Learning Lab Crash Course: Intermediate React](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/09-intermediate-react-1)
* [Learning Lab Crash Course: React Hooks](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/11-react-hooks)
* [Learning Lab Crash Course: Misc DevOps](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/14-misc-devops)
* [Learning Lab Crash Course: Intro to Firebase](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/master/18-firebase)

He'd also like to thank ACM Hack for Hackschool, which covers many intro to web development topics; he borrowed the BTS Twitter photos used in "[Should I use React in my hackathon project?](https://github.com/mattxwang/qwerhacks-21-workshops/tree/main/react/should-i-use-react)" from their [Hackschool 2020, Intro to React Workshop](https://github.com/uclaacm/hackschool-f20/tree/main/session-7-intro-react).

## Licensing

The contents of this repository are dual-licensed under the [MIT License](https://github.com/mattxwang/qwerhacks-21-workshops/blob/main/LICENSE) and the [Creative Commons Attribution 4.0 License](https://creativecommons.org/licenses/by/4.0/); feel free to use whichever license suits your purpose better.

I'd love to hear if you found this helpful, or if you have any suggestions! Please send me an email at [matt@matthewwang.me](mailto:matt@matthewwang.me).
