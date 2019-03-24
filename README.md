<div align="center">
  <h1>custom-starter</h1>
  <p>🚀 Start your projects fast simply using already created boilerplate repos</p>
  <img src="https://user-images.githubusercontent.com/31045769/54871564-acd0c980-4dbe-11e9-9377-a31d7d1747a0.gif" width="643" alt="Custom starter demo">
</div>
<br/>

[![Build Status](https://travis-ci.org/jediyozh/custom-starter.svg?branch=master)](https://travis-ci.org/jediyozh/custom-starter)
[![npm version](https://img.shields.io/npm/v/custom-starter.svg)](http://npm.im/custom-starter)

## The problem

In each project you start you need to create and install same files and modules as were in the previous one: configs, linters, dev packages. Maybe you have some saved gists so you go and copy them each time into new projects. It’s tiring and slow…

## This solution

You create boilerplate repo (on GitHub, Bitbucket, GitLab, your own...whatever you want!) with files and packages that aren’t being changed. Next you save a starter simple writing `custom-starter add` providing a name and url to the repo. Use it next time you start some project. It clones all files to the current project and **installs all packages if `package.json` exists**. You can add as many boilerplate repos as you want.

## Installation

`npm install -g custom-starter`

## Usage

![usage](https://user-images.githubusercontent.com/31045769/54871235-ab50d280-4db9-11e9-9d23-dc5e909781dd.png)

## LICENSE

MIT
