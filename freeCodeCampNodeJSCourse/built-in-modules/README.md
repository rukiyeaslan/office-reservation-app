# npm
global command comes with node

### npm --version
Prints the current version of npm

## local dependency
Use it only in this particular project
* npm i <packageName>

## global dependency 
Use it in any project
* npm install -g <packageName>
* sudo install -g <packageName> (mac)

## package.json
* manifest file
* stores important info about project/package
* it is important especially for codes in github. Once we have package.json, we don't need to push node_modules directory.
    * once you clone the project from github, simply run 'npm install' the necessary modules will be installed to your local space.
* manual approach 
    * create package.json in the root, create properties etc
* for more info click [here](https://nodesource.com/blog/the-basics-of-package-json-in-node-js-and-npm/)

* npm init (step by step, press enter to skip)
* npm init -y (everything default)