const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const monk = require('monk');
// const mongoose = require('mongoose');

const app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to the database
const db = monk('localhost:27017/Arcade'); // Connect to your MongoDB database named "Arcade"
const gamesCollection = db.get('Games'); // "Games" is the name of your collection

db.on('open', () => {
  // Event listener for successful connection
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  // Event listener for connection error
  console.error('Error connecting to MongoDB:', err);
});

app.get('/games', async (req, res) => {
  
  try {
    const games = await gamesCollection.find({});
    //console.log('Fetched games:', games);
    console.log("/games called");
    // res.json(games);
    // console.log(games)
    res.render('index', { "games": games });
  } catch (err) {
    console.error('Error retrieving data from MongoDB:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'));
  res.redirect('/games');
});

// // Serve create.html for the /create route
// app.get('/create', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'newItem.html'));
// });

// // Serve update.html for the /update route
// app.get('/update', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'update.html'));
// });

app.post('/addgames', async (req, res) => {
  try {
    const { title, genre, platform, releaseYear, developer, rating } = req.body;
    const newGame = {
      title,
      genre,
      platform,
      releaseYear: parseInt(releaseYear),
      developer,
      rating: parseFloat(rating)
    };

    const insertedGame = await gamesCollection.insert(newGame);

    // Redirect to the main page after successful form submission
    res.redirect('/index.html'); // Redirect to the root URL
  } catch (err) {
    console.error('Error creating new game:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

app.get('/addItem', (req, res) => {
  res.render('addItem');
});

app.post('/addItem', async (req, res) => { 
  try {
    // Create a new item using the model
    const newItem = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    };
    console.log(newItem);

    // Insert the document into the collection
    const result = await gamesCollection.insert(newItem);
    console.log('Document inserted successfully:', result.insertedId);
    res.redirect('/');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// New route for displaying item details
app.get('/games/:id', async (req, res) => {
  try {
      // Find the item in the database by ID
      const games = await gamesCollection.find({_id: req.params.id});
      console.log("game");
      console.log(games);
      if (!games) {
          return res.status(404).send('Item not found');
      }
      let game = games[0];
      res.render('itemDetail', { game });
  } catch (error) {
      res.status(500).send(error.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});
