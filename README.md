# README

## For a basic concept
A well-done tutorial: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

## Environment set up
1. VS Code with a terminal extension (PowerShell) installed
2. Node.js: https://nodejs.org/en/download/current
3. MongoDB: it's really hard to find what you want in their website... If you only got the GUI, then you will never be able to connect to the db :) Sad story.
    1. Server: https://www.mongodb.com/try/download/community
    2. GUI: https://www.mongodb.com/docs/compass/current/install/

## Steps to run
1. Create Database & Collection
    1. First of all, start mongodb compass (the GUI), and connect to db (port=27017 by default)
    2. Create a database named `Arcade` and a collection named `Games`
2. Insert data into the database/collection you just created
    1. start a terminal
    2. `cd [the directory of this project]`
    3. `node insertMany.js`
    4. refresh in the mongodb GUI to see if the data is inserted successfully
3. Run the web service
    1. install all the dependency modules: `npm install`
        - for you have the `package.json`, run `npm install` will install all the packages you need
    2. `node app.js`: the web service is running on the port 3000 (defined in the app.js code)
4. Check it out
    1. open a browser (maybe Google Chrome)
    2. `localhost:3000`
    3. try it out

## What is included
In the code you will have the ability to
1. Connect a mongodb database (app.js)
2. read data from mongodb (app.js)
3. insert data to mongodb (insertMany.js)
4. put the data you got from db to a webpage (views/index.ejs, views/itemDetail.ejs)
5. get some inputs from a webpage to insert into the db (views/addItem.ejs)

