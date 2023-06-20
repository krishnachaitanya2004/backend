const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
app.use(bodyParser.json());

const port = process.env.port || 5000;

mongoose.connect("mongodb://localhost:27017/auth",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}


//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email, password }, (err, user) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      } else if (!user) {
        res.status(404).send('User not found');
      } else {
        res.json(user);
      }
    });
  });
  
  app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, (err, existingUser) => {
      if (err) {
        console.log(err);
        res.status(500).send('Internal server error');
      } else if (existingUser) {
        res.status(409).send('User already exists');
      } else {
        const newUser = new User({ email, password });
        newUser.save((err) => {
          if (err) {
            console.log(err);
            res.status(500).send('Internal server error');
          } else {
            res.send('User registered successfully');
          }
        });
      }
    });
  });
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });