---
layout: post
title: "Making NSArray More Functional"
date: 2012-04-03 13:24
comments: true
categories: Objective-C
author: ErikP
---

Having spent a lot of time developing in C#, Ruby, and Javascript, I've had the pleasure of using frameworks like Linq, ActiveRecord, and Underscore.js. Each one has it's own set of similar functional methods that make working with collections a lot more fun. Objective-C on the other hand has beauties like
{% gist 2295259 existing.h %}
and is missing pretty much everything else.

Rather than haphazardly cram together a bunch of built-in `NSArray` methods every time we wanted to manipulate an array, we wrote our own methods. Some of them may be fairly naive implementations, but they get the job done and the names are so much easier to remember.

The good news is Objective-C supports Categories, so adding the methods to `NSArray` was a breeze. Checkout the [Github repository](https://github.com/hudl/NSArray-FunctionalHelper) to see all the methods and add more of your own.

Examples
--------

{% gist 2295259 examples.m %}