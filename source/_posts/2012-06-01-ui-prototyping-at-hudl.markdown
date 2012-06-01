---
layout: post
title: "UI Prototyping at Hudl"
date: 2012-06-01 10:30
comments: true
categories: UX
author: KyleM
---

At Hudl, we believe that you should design and prototype your app's user interface before you invest heavily anywhere else. The UI **is your whole product** in your users' eyes. It has to be great.

When we work on a new product or feature, we try to figure out the fastest way to build an interface to answer one question about our approach to the interface: "Are we on the right track?"

A lot of our ideas come from [Bill Buxton's great book about UX](http://www.amazon.com/Sketching-User-Experiences-Interactive-Technologies/dp/0123740371)--particularly as it relates to protoyping an experience. Bil says that your early sketches and prototypes should never be treated as _answers_ to the problem. 

Instead, teams should think of them as _questions_ about the problem. 

> Does this flow make sense? Is this in the right order? Should this object be bigger or smaller? Is the transition from A to B smooth or jarring?

You can't answer these questions by _talking about_ a UI. You have to see it and tinker with it. Better yet, **your users need to use it.**

There are all kinds of ways you can prototype and get this kind of feedback from both your internal team and external users. Many of them don't include writing UI code. Here are a couple of ways our designers and developers "fake it before we make it."

Sketched Workflows on Notable
-----------------------------

Sketches usually don't qualify as a true prototype unless you tie them together somehow.

We upload photos of sketches from our phones to [Notable](http://notableapp.com). Once there, we organize them into ordered sets and groups to illustrate a workflow. 

!(http://hudl-content.s3.amazonaws.com/cms/img/rawbits/notable-sequence.png)

The app is great because collaborators can comment inline on the sketch. Replies to those comments are threaded and everything stays clean.

It's like an async virtual whiteboard session for the product team. You can also share out public URLs for feedback from users. 

Screen Recording on a "Dumb" UI
-------------------------------

Even if your app can't "do anything" yet. You can communicate the intent fairly well with a couple of screen recordings and some simple video editing in a tool of your choice.

This approach works with static mockups as well as stubbed UI code.

<iframe src="http://player.vimeo.com/video/43261719?portrait=0" width="500" height="375" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

Again, the whole idea is to "fake" the experience of whatever you're building so that others on your team can put themselves in the user's shoes. You can also show the video directly to users and ask them: "Are we on the right track?"

<iframe src="http://player.vimeo.com/video/43265446?portrait=0" width="500" height="394" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

HTML + CSS + jQuery UI & Templates + Dropbox
--------------------------------------------

My favorite kind of prototype is one that's closest to the real thing without being too cumbersome, slow or expensive. If you're fast with hand-coding HTML and CSS, there are tons of JavaScript libraries out there that'll help bring your app to life.

Then just throw your project folder on Dropbox, send a link out to co-workers or users, and let them click through your design in their own browser.

Here's a prototype of a card-style interface for our Hudl Recruit prototype:
[Try the prototype live, here.](http://dl.dropbox.com/u/8878990/Prototype/boards_combined/index.html)

!(http://hudl-content.s3.amazonaws.com/cms/img/rawbits/hudl-recruit-prototype.png)

I used to complain about not having _realistic_ dummy data for my designs. jQuery templates and a little JSON data structure make this easy:

{% gist 2854039 %}

That's an individual "card" object in the UI. I instantiate a bunch of them in a JavaScript loop before the page loads and cycle the data into each with a hand-written bit'o JSON:

{% gist 2854058 %}

It's a sin the web design world to use "Lorem ipsum" for all your copy. In the application world, it's just as bad to use "Person 1", "Person 2", "Person 3", etc. for a list of people. If you're treating content as filler you're ignoring the whole purpose of the app! A real user cares a lot about those names!

Using a _little bit_ of code as a designer is necessary. This method is quick and dirty but using more realistic data lets you and potential users get a feel for how this thing might behave in the real world.

Paper Prototype
---------------

I love to sketch. The engineer in me also also loves to create reusable components. That's why making a prototype with paper and sharpie is a wonderful exercise. 

Instead of repeatedly drawing the same "shell" for your screens over and over again, you can sketch small pieces of your UI, cut them out, and tape them to the rest to show an interaction.

In this demonstration, you'll see me show transitions between states by adding and removing little pieces of UI to and from the canvas.

<iframe src="http://player.vimeo.com/video/11924309?portrait=0" width="500" height="375" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

The lesson I learned from this exercise is that no one likes 18 minute videos. If you're doing asynchronous design communication, you have to keep things short. The solution needs to have an emotional impact right out of the gate.