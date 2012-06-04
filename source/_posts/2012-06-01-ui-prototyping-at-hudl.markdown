---
layout: post
title: "UI Prototyping at Hudl"
date: 2012-06-01 10:30
comments: true
categories: UX
author: KyleM
---

At Hudl, we believe that you should design and prototype your app's user interface before you invest heavily anywhere else. **The UI is your whole product** in your users' eyes. It has to be great.

When we work on a new product or feature, we try to figure out the fastest way to build an interface to answer one question about our approach to the interface: "Are we on the right track?"

A lot of our ideas come from [Bill Buxton's great book about UX](http://www.amazon.com/Sketching-User-Experiences-Interactive-Technologies/dp/0123740371)--particularly as it relates to protoyping an experience. Bill says that your early sketches and prototypes should never be treated as _answers_ to the problem. 

Instead, teams should think of them as _questions_ **about** the problem. 

> Does this flow make sense? Are these steps in the right order? Can we make assumption X and skip this altogether? Should this object be bigger or smaller? Is the transition from A to B smooth or jarring?

You can't answer these questions by _talking about_ a UI. You have to see it and tinker with it. Better yet, **your users need to use it.**

There are all kinds of ways you can prototype and get this kind of feedback from both your internal team and external users. Many of them don't include writing UI code. Here are a couple of ways our designers and developers "fake it before we make it."

Sketched Workflows on Notable
-----------------------------

Sketches usually don't qualify as a true prototype unless you tie them together somehow.

We upload photos of sketches from our phones to [Notable](http://notableapp.com). Once there, we organize them into ordered sets and groups to illustrate a workflow. 

![Notable Sequence](http://hudl-content.s3.amazonaws.com/cms/img/rawbits/notable-sequence.png)

The app is great because collaborators can comment inline on the sketch. Replies to those comments are threaded so everything stays logically organized. Unlike an email or Basecamp thread, you avoid having to repeatedly refer to a specific location on a particular sketch.

It's an async virtual whiteboard session for our product team. You can also share out public URLs to gather feedback from users. 

Screen Recording on a "Dumb" UI
-------------------------------

Even if your app can't _do anything yet_. You can communicate the intent with a a screen recording and bit of video editing in a tool of your choice.

This approach works with static mockups as well as stubbed UI code.

<iframe src="http://player.vimeo.com/video/43261719?portrait=0" width="500" height="375" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

Again, the whole idea is to _fake_ the experience of whatever you're building so that others on your team can put themselves in the user's shoes. You can also show your customers the video directly and ask: "Are we on the right track?" If they aren't **visibly or audibly excited** by it, you're off the mark. When you solve a real problem, people get emotional. Prototypes are real enough that they draw emotion out. Your team has to read that and react in future iterations.

<iframe src="http://player.vimeo.com/video/43265446?portrait=0" width="500" height="394" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

The voiceover helps provide emphasis on particularly important interactions. It can also remind stakeholders of the areas "we'll figure out later" so you can keep feedback moving down the path you want.

HTML + CSS + jQuery UI & Templates + Dropbox
--------------------------------------------

Our favorite kind of prototype is one that's closest to the real thing without being too cumbersome, slow or expensive. If you're fast with hand-coding HTML and CSS, there are tons of JavaScript libraries out there that'll help bring your app to life.

Then you can put the project folder on Dropbox, send a link out to co-workers or users, and let them click through your design in their own browser.

Here's a prototype of a fluid-width, card-style interface for our recent recruiting product:
[Try the live prototype here.](http://dl.dropbox.com/u/8878990/Prototype/boards_combined/index.html)

We were exploring the idea of using lots of drag, drop and hover states using the cards--stuff that's really hard to capture in a static mock.

![Hudl Recruit Prototype](http://hudl-content.s3.amazonaws.com/cms/img/rawbits/hudl-recruit-prototype.png)

Sometimes it's a pain to get _realistic_ dummy data for your designs. It's a sin the web design world to use "Lorem ipsum" for all your copy. In the application world, it's just as bad to use _Person 1_, _Person 2_, etc., for a list of people. If you're treating content as filler you're ignoring the purpose of the app from the user's perspective! A real user cares a lot about those names.

jQuery templates and a little JSON data structure make this easy:

{% gist 2854039 %}

That's an individual "card" object in the UI. We instantiate a bunch of them in a JavaScript loop before the page loads and cycle the data into each with a hand-written bit'o JSON:

{% gist 2854058 %}

Using a _little bit_ of code as a designer is necessary. This method is quick and dirty--much of it isn't in the production version of this app. But using more realistic data lets you and potential users get a feel for how this thing might behave in the real world.

Paper Prototype
---------------

We love to sketch. The engineer in us also also loves to create reusable components. That's why making a prototype with paper and sharpie is a wonderful exercise. 

Instead of repeatedly drawing the same "shell" for your screens over and over again, you can sketch small pieces of your UI, cut them out, and compose them to communicate an interaction.

In this demo, you'll see different states shown by adding and removing pieces of paper on the canvas.

<iframe src="http://player.vimeo.com/video/11924309?portrait=0" width="500" height="375" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>

The lesson we learned from this exercise is that no one likes 18 minute videos. If you're doing asynchronous design communication, **you have to keep things short**. The solution needs to have an emotional impact right out of the gate.

Conclusion
----------

We've shown you a couple different ways we've prototyped interfaces at Hudl. We don't do it the same way every time but we always make them with the same idea in mind. 

> What's the fastest way to build something that answers questions we have or tests assumptions we've made about our users and their workflow? 

The code quality, technology, and tools don't matter at all compared to that.
