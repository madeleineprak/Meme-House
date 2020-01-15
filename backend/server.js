const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const Data = require('./data.js');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
  'mongodb://localhost/memes';

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route for getting all Memes from the db
// router.get("/memes", function(req, res) {
//   Data.find({})
//     .then(function(dbMeme) {
//       res.json(dbMeme);
//     })
//     .catch(function(err) {
//       res.json(err);
//     });
// });
app.get('/memes', function(req, res) {
  Data.find({}, null, {sort: '-createdAt'}, function(err, memes) {
    if(err) {
      res.send("errrror")
    }
    console.log("Success")
    res.json(memes);
  })
})

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
  Data.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

// this is our update method
// this method overwrites existing data in our database
app.post('/updateData', (req, res) => {
  const { id, update } = req.body;
  Data.findOneAndUpdate(
    { _id: id }, 
    { likes: update })
  .then(function(data){
    res.json(data);
  })
  .catch(function(err){
    res.json(err);
  });
});

// this is our delete method
// this method removes existing data in our database
router.delete('/deleteData', (req, res) => {
  const { id } = req.body;
  Data.findByIdAndRemove(id, (err) => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});

// this is our create methid
// this method adds new data in our database
router.post('/putData', (req, res) => {
  let data = new Data();

  const { meme } = req.body;

  if (!meme) {
    return res.json({
      success: false,
      error: 'INVALID INPUTS',
    });
  }
  data.meme = meme;
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ data });
  });
});

// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));