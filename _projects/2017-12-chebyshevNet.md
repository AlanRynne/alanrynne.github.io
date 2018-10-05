---
layout: project
title: "Chebyshev Net Grasshopper Component"
description: "Implementation of the chebychev net algorithm on a freeform surface"
bg: '/assets/img/leeFerrel.jpg'
---

Today, I'm going to write about Chebychev Nets and how to generate them on any given freeform surface. More specifically, I will be implementing what is known as the 'compass method'; a suprisingly easy concept, used by architect Frei Otto on the Mannheim Multihale, among many other projects.

### Chebyshev Net Algorithm

The algorithm itself is fairly simple, I will boil it down in the basic steps but, in my opinion, the following image explains the procedure better than anything anyone could write:


It comes down to the following steps:

Given any freeform surface, a point on that surface and a desired grid size;

1. Draw  2 curves on the surface that intersect on the point;
2. Find the points in each curve that are equidistant to each other;
3. Using the same compass distance, find the points between the axis' in a procedural manner until you cannot obtain any more points in the surface.
4. As you can imagine, doing this with an real compass in a scale model as Frei Otto did is a painstaking process that required VERY precise hanging chain models in order to be able to reliably scale the obtained geometry from model to building scale.

I am a heavy Grasshopper3D user and I found it very surprising that there was no available component for generating this kind of grids, so I decided to write my own in C# using the RhinoCommon and Grasshopper SDKs (you can find the link to the project below). Since computer programming is NOT as simple as using a compass, I drew up a pseudocode of what I was actually looking for the program to do before starting any code. When I was finished, it looked like this:

> INSERT PSEUDOCODE:

### Grasshopper Implementation

Once I was convinced that the logic behind this pseudocode was almost correct, I started implementing a Grasshopper(GH) algorithm using Anemone, a plugin for making loops inside GH. The resulting algorithm did the job correctly, but took more than 20 minutes to find a 50x50 unit grid in every direction, due to the extremely poor performance of anemone loops when you nest several together.

> INSERT GRASHOPPER IMAGE

Since the algorithm was working, I decided to switch to invest some extra time to re-write it as a custom C# Class that would achieve the same result. Since it is 300 lines of code, instead of pasting it you can check the code here. I added a couple of extra options to be able to extend the surface, modify the amount of 'axis curves' the algorithms starts with (experimental feature) and the ability to 'skew' the original net.

> INSERT COMPONENT IMAGE

Same 50x50 unit grid took 200ms to run. So we can safely call it a dramatic improvement!

The 'axis curve' generation is done automatically following a starting vector, this way works faster that doing direct intersections plus it has the ability to be further modified to, for example, follow the curvature vector of a surface instead of a fixed vector.

The resulting Grasshopper Component is still a Work in Progress, and will suffer updates in the future. You can find the latest version available following the button below.


<button onclick="window.location.href='https://github.com/AlanRynne/ChevyshevNet-GH'">Go to GitHub Repo</button>

I am a strong believer of Open Source stuff and, as such, there is no restriction on how or where you use this code but, as always, GCWCID is appreciated ('give credit where credit is due').

Hope you enjoy it!! :D