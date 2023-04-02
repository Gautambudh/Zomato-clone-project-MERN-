require('dotenv').config()
const express = require('express');
const APIRouter = require('./Routes/APIRouter');
const mongoose = require('mongoose')
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5003;
const mongodb_uri = `${process.env.mongodb_uri}?retryWrites=true&w=majority`

app.use(cors()); // to enable the CORS policy
app.use(express.json()); // string data to json 
app.use(express.urlencoded({extended: false})); // if extended!=false, it will give get, put & post also in body



// before starting the connection we had to check the db connection
// mongoose.connect(mongodb_uri)
// .then( () => {
//     console.log("DB connected successfuly")
//     app.listen(PORT, () => {
//         console.log("Server Running on port", PORT);
//     })
// })
// .catch((e) => {
//     console.log("error while connecting to db");
//     console.log(e);
// })

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(mongodb_uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log("error while connecting to db");
      console.log(error);
    }
  }
  
  // adding external routing
// middleware
  //Routes go here
  app.use('/', APIRouter)
  
  //Connect to the database before listening
  connectDB().then(() => {
      app.listen(PORT, () => {
          console.log("listening for requests on port", PORT);
      })
  })