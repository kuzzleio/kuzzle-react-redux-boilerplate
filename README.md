# Kuzzle, React and Redux boilerplate

A pretty fat boilerplate to start-off webapp projects based on Kuzzle and React/Redux.
This boilerplate is composed of a **backend**, located in `./backend` and a **frontend**, located in `./frontend`.

Each layer of the stack contains its corresponding `README.md` file. Please refer to it.

## Overview

This boilerplate provides you with:

- A dockerized instance of Kuzzle, ready to be extended with a...
  - ...plugin boilerplate mounted as a volume in the Kuzzle Docker container
- A React web application based on the Kuzzle SDK v6, including:
  - an implementation of the authentication method integrated with Redux
  - an implementation of the "Offline mode", also integrated with Redux
  - an implementation of react-toastify to show notifications

## Install

Clone this repository using the following command

```bash
git clone --recurse-submodules https://github.com/kuzzleio/kuzzle-react-redux-boilerplate.git
```

> Note that the `--recurse-submodules` is important since the `backend` folder is a submodule pointing to the [Kuzzle Plugin
> Advanced Boilerplate](ttps://github.com/kuzzleio/kuzzle-plugin-advanced-boilerplate).

## And then what?

Start your local Kuzzle instance by typing

```bash
docker-compose -f backend/docker/docker-compose.yml up -d
```

Login to [Kuzzle Admin Console](http://console.kuzzle.io) and create your admin account.

Serve your web app locally by typing:

```bash
cd frontend
npm install && npm run serve
```

It's done! Now you can visit [localhost:3000](http://localhost:3000/) and login with the previous created account.

## Start a new project

If you want to start a new project from this boilerplate, delete the Git tree and reinitialize the repo from scratch:

```bash
cd kuzzle-react-redux-boilerplate
rm -rf .git
```

At this point you may rename the folder of your project to a meaningful name.
Then, you can set remote(s) the usual way:

```bash
git init
git remote add origin <another-git-server-URL-here>
```

It's all over! Now you can start your new project using Kuzzle and React.
