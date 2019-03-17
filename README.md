<h1 align="center">custom-starter</h1>

<p align="center">🚀 Start your projects fast simply using already created boilerplate repos</p>

[![Build Status](https://travis-ci.org/jediyozh/custom-starter.svg?branch=master)](https://travis-ci.org/jediyozh/custom-starter)

## The problem

In each project you start you need to create and install same files and modules as were in the previous one: configs, linters, dev packages. Maybe you have some saved gists so you go and copy them each time into new projects. It’s tiring and slow…

## This solution

You create boilerplate repo (on GitHub, Bitbucket, GitLab, your own...whatever you want!) with files and packages that aren’t being changed. Next you save a starter simple writing `custom-starter add` providing a name and url to the repo. Use it next time you start some project. It clones all files to the current project and **installs all packages if `package.json` exists**. You can add as many boilerplate repos as you want.

## Installation

`npm install -g custom-starter`

## Usage

`custom starter --help`

```
Usage: custom-starter [options] [command]

Options:
  -V, --version  output the version number
  -h, --help     output usage information

Commands:
  use [name]     Use a starter, name is optional
  add            Add a new starter
  list           Print starters list
  remove         Remove a starter
```

## LICENSE

MIT
