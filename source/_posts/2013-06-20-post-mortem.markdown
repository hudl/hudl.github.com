---
layout: post
title: "Post-Mortem for Internal Incident on June 13"
date: 2013-06-20
comments: true
categories: DevOps Post-Mortem Degradation DNS AWS
author: TysonS
---

*We think there are members of the tech community who would appreciate getting our perspective on operational incidents at Hudl. In the spirit of sharing so we can all become better at resolving issues, we present our first public post-mortem.*

Summary
---
One of our availability zones in AWS (us-east-1) experienced DNS resolution problems, meaning some services within our infrastructure could not talk to other services. We removed traffic from the affected services and monitored the situation. Amazon resolved the issue and we reintroduced traffic to those services.

**Time to Discovery** (time from incident origination to our identification of the cause): 11 minutes
**Time to Resolve** (time from identification of the cause to remediation of the incident): 5 minutes

Technical Details
---
Around 17:09 CDT on June 13, some of our servers started logging errors when trying to contact our cache servers. At about 17:15, we were preparing a production deployment when we noticed these errors thanks to a Splunk dashboard. We took note that the errors were coming from one specific availability zone and verified all cache servers were available and responsive. We then accessed two of the servers that were reporting errors and attempted to ping other servers first by DNS, which failed immediately, and then directly by IP, which succeeded. From this, we wagered there was a DNS issue internal to AWS. We watched Twitter for reports to confirm this hypothesis, which happened some minutes later.

About 17:20, we made the call to remove web traffic from these servers using Amazon's Elastic Load Balancer. Even after a couple of minutes, the change did not appear to have taken effect, so we removed each server individually. By 17:25, none of the affected servers were receiving traffic anymore, but they continued to report errors. Over the next twenty minutes, we continued to research the situation, concluding that the driver for the cache servers was continuing to retry the connections and generating the errors, even without web traffic.

At 17:42, AWS acknowledged the problem, and later reported that it was resolved by 17:39. Errors subsided as the affected servers were once again able to contact the cache servers. Around 17:50, we re-enabled traffic and continued to monitor the servers until we were satisfied the situation was resolved.

We have no reason to believe our users were impacted by this event.

What We Learned
---
When we conduct DevOps post-mortems, we want to identify ways to improve our infrastructure to be more fault tolerant, our knowledge to quickly and accurately discover the causes, and our alerts to be fast and with a high signal to noise ratio. That said, we're still careful about what action items we take away. We want to be sure any changes we make will be truly valuable.

The low-impact nature of this incident means we will consider improvements to our fault tolerance in the medium-to-long term rather than right away. One potential improvement we will be looking into is the automatic removal of traffic from servers that are assessed to be unhealthy.

In this case, the primary action item involved creating new alerts. We caught this incident by a happy accident--that someone happened to be looking in the right place at the right time. As a result, we introduced two new Splunk alerts that will bring to our attention similar situations so that our DevOps team can take action right away.
