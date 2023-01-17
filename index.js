const express = require('express')
const connect = require('./config/db')
const router = require('./routes/userRoutes')
const postRoutes = require('./routes/postRoutes')
const path = require('path')
const cors = require('cors');

const mongoose = require('mongoose')
require('dotenv').config()
mongoose.set("strictQuery", false);

const bodyParser = require('body-parser')

require('dotenv').config()
const app = express();

// connect to DB
// connect();

// mongoose.connect(process.env.URL,() => console.log("MongoDB Connected"))
mongoose.set('bufferCommands', false);

const connectDatabase = async () => {
    try {
      await mongoose.connect(process.env.URL);
      console.log("connected to database");
    } catch (error) {
      console.log(error);
    }
  };
  
connectDatabase();

require('./models/Post')
require('./models/user')

app.use(bodyParser.json());
app.use("/", router);
app.use("/", postRoutes);
app.use(cors())
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

const PORT = process.env.PORT || 5000

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "/client/build/")))
    app.get('*', (req, res)=>{
        res.sendFile(path.join(__dirname, "/client/build/index.html"))
    }),
    function (err){
        res.status(500).send(err);
    }
}


app.listen(PORT)


// Databse User
// new user = blog-test
//  password = blog-test
// mongodb+srv://blog-test:blog-test@cluster0.4qumbvn.mongodb.net/?retryWrites=true&w=majority