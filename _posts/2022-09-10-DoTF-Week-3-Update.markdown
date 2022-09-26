---
layout: post
title: 	"DotF | End of Week 3 Update"
date: 	2022-09-10 12:00:00 -0400
categories: GameDev DotF
---

The Brackeys 2022.2 Gamejam began on August 21st and ended on August 27th. I worked alongside seven other people,  for a total count of an eight-person team. It was split fairly down the middle with four programmers and four artists. Despite such a big team, we were unable to meet the deadline and couldn't submit an entry to the jam. I have since been working with a skeleton-crew of sorts on the game, with the lead programmer Joseph Roussos and myself.

At the date of writing it has been three weeks since the project began, so two weeks since the jam ended, and I have worked on it every single day. Most days I work for 4 hours, somedays I've been able to commit 7, and every so often I only am able to put in like an hour or two. 

This is my way of getting proficient with the game-development workflow. If I only worked on making games during game jams, I think it would take way too long to get anywhere substantial. Jams are great for forcing deadlines and getting you used to finishing a product, but they also encourage short-sighted thinking and bad code practices. The feeling you need to rush can often stifle creative ideas. You tend to make a lot of compromises in these scenarios. At the same time, you do come up with creative methods of improving efficiency, so all in all it evens out. Supplementing those weak points by focusing on them outside of jams is, what I believe to be, a pretty solid way to work on these skills. 

So big picture here, I'm three weeks in and the game still doesn't have any levels, there's still a lot that needs to be reworked, and all we have to show are a bunch of new mechanics. What's the end goal? What does the finishing line for this project look like?

Ludum Dare 51 (another game jam) begins on September 30th and it is currently September 10th. I am setting for myself right now a limit of 20 more days to work on this project. By the time Ludum Dare starts, most of this game should be finished and hopefully all that is left should be polishing and testing, if the product has not shipped by then. Of course if the game is 90% by then and I believe it wont take much longer, I will continue to work on it. But I should not be working on this past mid-October at the very latest.

So with 20 days left, I should plan out what I need to get done in order to bring this game to a close. Before I do that, I should probably look at what I have done in the last two weeks since the Jam ended.

The first week was fairly slow in progress. I just started my second year of courses at University, so there was a lot going on. I tried doing some work on the final boss, but it was still nonfunctional by the end of the week. I tried making a breakable object based on the enemy scripts we had, but they were all so interconnected that the task was impossible without major refactoring. So I started working on some simple things, since I was still very green on a lot of unity concepts, so I started implementing Triggers. These triggers started out by enabling and disabling objects, and eventually would move on to creating fade-able ceilings to create an indoors & outdoors effect, and lastly a connection with the gate system. By the end of the week, I was reworking the gate system we had in place. Gates would open when all enemies were dead, but at the time it was checking for all enemies in the entire scene. It only worked in a linear fashion and it was all tied up with an enemy spawning script.

Week two continued work on those gates. By the middle of the week, gates could be opened in any order and any fashion, could be opened based on conditions separate from enemies, and could open based on specific enemies. Triggers were getting a new uplift based on making abstract classes- this work is still unfinished. I need to standardize the three trigger scripts into implementing the abstract base class I've now setup. I had a short few days where I tried to implement some sort of parallax system, but it isn't entirely the look I desired. I wanted to create depth using multiple parallax layers, but I couldn't find a good solution that could move layers based on distance, or calculating the speed that each layer should move to show depth right. Moving on from that I began refactoring the attack system, and right now I'm working on reworking how all of that works.

So not a lot of glamorous work when I type it out, most of this has been just refactoring and laying groundwork for what's to come. A lot of major changes need to happen this week. 

Rough goals for the following weeks.

1. Full attack rework, multiple attacks, secondary attack
2. Enemy rework, final boss
3. Levels, polishing.

The skill tree needs to be reworked, but unless I get these things done first, I don’t think I'll be able to make my target goal.

The end of this write-up is rushed, I've been working on this for an hour. I want to wrap things up here.