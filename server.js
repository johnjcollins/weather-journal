const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Express to run server and routes

// Start up an instance of app
const app = express();

/* Dependencies */
/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const getProjectData = (req, res) => {
  res.send(projectData);
};

const addProjectData = (req, res) => {
  const { temp, date, feelings } = req.body;
  projectData = {
    temp,
    date,
    feelings
  };
  res.send(projectData);
};

app.get('/all', getProjectData);

app.post('/add', addProjectData);

// Spin up the server
// Callback to debug

const port = 3000;

const listening = (req, res) => {
  console.log('Server started...');
  console.log(`Listening on port ${port}...`);
};

const server = app.listen(port, listening);

// Initialize all route with a callback function

// Callback function to complete GET '/all'

// Post Route
