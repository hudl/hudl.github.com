---
layout: post
title: "Preparing for Season: Load Testing"
date: 2012-10-05
comments: true
categories: DevOps Load-Testing
author: TysonS
---

Introduction
------------

Hudl is fundamentally a technology company, and our area of focus is sports. Since our namesake application is web-based, and most of our partners are football coaches, that presents us with an interesting situation: our usage changes dramatically with the time of the year (and of the week, for that matter). In some ways, that's good. The offseason gives us an opportunity to catch our breath, tackle bigger features, and concentrate on adding more value to our product. 

However, since our public launch in 2009, we've expanded our user base significantly each year, and we don't really feel that full impact until the last couple weeks of August when football programs move into full swing. Most other web applications grow at a steady pace, so scaling is something they deal with regularly. They'll likely add some more hardware, optimize their application code, tweak settings, and repeat frequently. Because their site load does not generally recede for longer than a day or so, this strategy will work well. 

Hudl's usage is not nearly so regular. Not only is it strongly seasonal, each season brings significantly more users than our application has ever seen before. So how do we prepare? We rely on simulation during the offseason. We work hard to predict our fall numbers and emulate our upcoming usage in order to find bottlenecks and weak links before the real season starts. Simulation is never as good as the real thing, but just like the teams who depend on us, we rely on our preparation to take us successfully through the season.

Analyzing Current Usage
-----------------------

Before we can simulate our users' behavior, we have to understand what it is they do. For this, we draw from two main sources of information. The primary is our usage logs. We do extensive logging throughout our application code, and all that data winds up in [Splunk](http://splunk.com) where we can search and analyze it. We also use Google Analytics to tell us where users spend most of their time on our site. We look for the HTTP endpoints and services that are most heavily used during our previous season, then factor in recent trends because we've added several new features since December. From here, we'll pick off the most used web requests to emulate. Typically, we draw a line at about 1% or more of the total requests, but it's not an absolute rule because we know from experience that certain services are likely to be costly even if they are not used frequently.

As with all simulation, there are some inaccuracies. Our usage data is good, but it isn't perfect. Even if it were, we wouldn't be able to emulate the usage perfectly, and we leave many of the lesser-used features untested due to resource constraints. And, as I mentioned before, we're relying on numbers from the prior season which is likely to differ from this season's numbers because of new designs and features. We have ways to mitigate these risks, but that's another topic.

Tools
-----

Our load testing suite is built on Microsoft's Visual Studio Ultimate load testing framework. Running on a .NET stack, we're already heavily invested in Microsoft's development tools, so it was a natural choice. The starting point for these load tests is recording web tests.

![Visual Studio .webtest screenshot](http://static.hudl.com/cms/img/rawbits/vs_webtest.png "Visual Studio .webtest screenshot")

Web tests can make any kind of HTTP request, and the recorder will automatically set appropriate headers for HTML, JSON and SOAP requests. We intentionally keep the .webtest files instead of converting them into C# code because they can be maintained through the GUI, which makes them more accessible for maintenance by even those not intimately acquainted with the suite. To keep the tests in that format required some significant infrastructure in code, though. The framework is delightfully modularized so we can build plugins at all levels of the test to capture, extract, and/or inject data. 

{% gist 3841524 ExtractPublishedClipId.cs %}

The most important part of our web tests is the seed data. We need it to be as accurate as possible, so we harvest real user data, denormalize it, and insert it into a seed database. We created a tool to do this, of course, and it currently takes about six hours to create this database. Fortunately, we don't need to do it very often as the data is not changed during testing.

Feeding the data into the tests is tricky because the DataSources the framework provides cannot take criteria. When you're emulating a user on Hudl, the data has to be specific to that user or the test is pointless. We leveraged the WebTestPlugin class to create our own datasources that query the seed database for a related set of data and cache it for use during subsequent iterations. It is also lazy loaded. This keeps the memory footprint on the test agents as low as we can keep it, and eases the strain on the seed database (which is located centrally on the load test controller). 

{% gist 3841573 AnnotationsDataSource.cs %}

{% gist 3841578 AnnotationsDataSourcePlugin.cs %}

Running in the Cloud
--------------------

As you might expect, because Hudl runs on EC2, we also test on and against EC2. We spin up an exact replica of our production environment and enough instances to simulate the number of simultaneous users we want to test. Microsoft recommends each load test agent only run 1000 concurrent users, and we generally stick to that. We need to add one more server to be the controller for the test agents. The controller coordinates the tests, feeds the agents seed data, and collects and aggregates result data. We often run these tests for hours at a time so we can examine the site behavior during and after long periods of stress. When we're through, we can terminate these instances so we only spend money when we're actively testing.

Wrapping Up
-----------

While the tests are running, we watch site performance and server metrics. Finding and addressing these bottlenecks is a post in itself, but we're especially interested in seeing how our databases perform, where the expensive operations are and if they can be remedied, and how the system reacts when we kill servers. Once the tests have completed, we can critique performance: How many errors did we see, and are they legitimate? Why did these requests take so long? What can we do to improve our average page speed?

The answers to these questions will determine the success of our season and the success of many of our partners' seasons.