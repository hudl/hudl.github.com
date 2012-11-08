---
layout: post
title: "Synchronous AFNetworking"
date: 2012-11-08 13:42
comments: true
categories: Objective-C
author: ErikP
---

Almost everyone is using [AFNetworking](https://github.com/AFNetworking/AFNetworking) these days, but one issue I've ran in to a couple times is the lack of synchronous methods.

A little searching around the nets didn't produce much except the ["Don't make synchronous requests"](http://stackoverflow.com/questions/7969865/can-afnetworking-return-data-synchronously-inside-a-block) suggestion. In general, that's the best answer; handling queues/threads/operations/etc becomes tricky pretty quickly. But what about those times when you know synchronous is the right way to go?

First off, spend a little time in the [GCD docs](https://developer.apple.com/library/ios/#documentation/Performance/Reference/GCD_libdispatch_Ref/Reference/reference.html). Playing with these methods can lead to deadlocks if you aren't careful. After that, check out the method below. It has nearly the same signature as `- [AFHttpClient postPath:parameters:success:failure:]`, but instead of success and failure callbacks it _returns_ the result. In my case, it returns `nil` for a failure, the resulting object, or "Great Success" if the request completed successfully but without a response body.

{% gist 4041156 %}

__Be sure to call this method on a queue other than the main queue.__ I _implore_ you. The calling queue will be blocked until the network request returns. If you do this on the main queue, you'll have some very unhappy users. Note the dispatch block below is on a low priority queue.

{% gist 4041333 %}

That's it for quick and dirty synchronous AFNetworking. It'll turn your nasty, callback spaghetti code in to pretty, ordered procedural code.