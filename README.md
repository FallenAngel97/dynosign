<img height=60 align=left src='templogo.png'>

# Dynosign
[![Build Status](https://travis-ci.org/FallenAngel97/dynosign.svg?branch=master)](https://travis-ci.org/FallenAngel97/dynosign)

Cross-platfrom UI graphical editor. Written with React and Redux. Currently in development, you need to download source code and build by yourself.

!["Screenshot"](screen.png)

## Features

- Open source, anyone can contribute to development
- (still concept) Both UI constructing and animations features
- Layered interface, similar to all modern UI tools

## Working now

|Feature            |Demo                   |
|-------------------|-----------------------|
|Selection          |!["video"](output1.gif)|
|Circle drawing     |!["video"](output2.gif)|
|Rectangle drawing  |!["video"](output3.gif)|
|Simple line drawing|!["video"](output4.gif)|
|Moving objects     |!["video"](output5.gif)|
|Fonts (text tool)  |!["video"](output6.gif)|
|Layer manipulation |!["video"](output7.gif)|

## Why another Electron app?

This project is meant to be dead simple both to end users and developers. A lot of developers know JavaScript. Also, there exist a lot of libraries, which can help to develop application. Based on these facts, Electron is the best way to establish quick and working prototype

## How to build on local machine?

First of all, you will need a Node.JS and NPM. I'm using Arch Linux distro, but you can try on any supported by Node. 

| Build          | Develop              |
|----------------|----------------------|
|`npm i`         |`npm i`               |
|`npm run build` |`npm run watch`       |
|                |`npx electron-rebuild`|
|`npx electron .`|`npm start`           |

 # Join the team 
 Do you want to collaborate? Join the project at https://crowdforge.io/projects/552