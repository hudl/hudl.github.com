---
layout: post
title: "Post-Mortem for Service Degradation on June 13"
date: 2013-06-20
comments: true
categories: DevOps Post-Mortem Degradation DNS AWS
author: TysonS
---

We think there are members of the tech community that would appreciate getting our perspective on service interruptions and other incidents at Hudl. In the spirit of sharing so we can all become better at resolving issues, we present our first public post-mortem.

Summary
---
One of our availability zones in AWS (us-east-1) experienced DNS resolution problems, meaning some services within our infrastructure could not talk to other services. We removed traffic from the affected services and monitored the situation. Amazon resolved the issue and we reintroduced traffic to those services.

**Time to Discovery** (time from incident origination to our identification of the cause): 11 minutes  
**Time to Resolve** (time from identification of the cause to resolution of incident from user perspective): 5 minutes

Technical Details
---
At about 17:09 CDT on June 13, some of our servers started logging errors when trying to contact our cache servers. At about 17:15, Jon Dokulil was preparing a production deployment when he noticed these errors thanks to a Splunk dashboard. He took note that the errors were coming from one specific availability zone and contacted Tyson Stewart about the problem immediately. Both Jon and Tyson independently verified that all of the cache servers were available and responsive. Tyson then accessed two of the servers that were reporting errors and attempted to ping other servers first by DNS, which failed immediately, and then directly by IP, which succeeded. From this, he wagered a guess that there was a DNS issue internal to AWS. Jon started watching Twitter for reports that might confirm this hypothesis.

At about 17:20, they made the call to remove web traffic from these servers using Amazon's Elastic Load Balancer. Even after a couple of minutes, the change did not appear to have taken effect, so Tyson removed each server individually. By 17:25, none of the affected servers were receiving traffic anymore, but the servers continued to report errors. Over the next twenty minutes, both Tyson and Jon continued to research the situation, concluding that the driver for the cache servers was itself continuing to retry the connections and generating the errors, even without web traffic.

At 17:42, AWS acknowledged the problem, and later reported that it was resolved by 17:39. Errors subsided as the affected servers were once again able to contact the cache servers. At about 17:50, Jon and Tyson re-enabled traffic and continued to monitor them until they were satisfied the situation was resolved.

Because the problem seemed to be limited to servers contacting the cache servers, we think our users only experienced slightly slower responses and only if they were requests to this particular availability zone.

What We Learned
---
We're careful about what lessons we take away from incidents. We want to be sure any changes we make to improve our fault tolerance will be resources well-spent. In this case, we don't believe that any changes to our infrastructure are necessary.

However, we caught this incident by a happy accident--that Jon happened to be looking in the right place at the right time. As a result, we have introduced two new Splunk alerts that will bring a situation similar to this to our attention so that our DevOps team can take action right away.
