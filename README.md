# Seed

A connect the dots game where the user must gather many seeds.

![seed](public/img/seed-collection.png)

Goals:

+ Start with a browser based game using React
+ Different layouts of each board
+ Maybe use gsap animation library for more complex animation effects / sequencing
+ A level system where the user progresses through a hub world
+ An ios / android version in React Native

If you'd like to collaborate feel free to leave an issue on github.

## Installing Locally

To run the build, clone the repo (or fork it)

```
git clone https://github.com/andrewMacmurray/seed.git
```

install the node modules:

```sh
$ npm install
```

If you just want to make changes to the frontend code webpack is set up with hot reloading so run

```sh
$ npm run dev
```

and go to `localhost:8080` to see the project

If you want to run it with a server (i.e. add some database functionality) you need to run two commands

```sh
$ npm run nodemon
$ npm run watch
```

This starts a node server (which restarts on saving your files) and runs webpack in watch mode (it builds a bundle and watches for changes - rebuilding the missing bits on change)

visit `localhost:4000` to see the project

Both the artwork and idea specifically are licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International Public License, the code is free to use otherwise.
