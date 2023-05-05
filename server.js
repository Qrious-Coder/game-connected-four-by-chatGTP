const express = require('express');
const server = express();

require('dotenv').config();

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const cors = require('cors');
server.use(cors());

server.get('/', (req, res) => {
  res.send('yay! server is working!')
});

const authRoutes= require('./route/authRoute');
server.use('/', authRoutes )

const connectDB = require('./db');
const port = process.env.PORT || 5001;
const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL)
    server.listen( port, () => console.log(`Server is running on http://localhost:${port}`))
  } catch(err){
    console.log(err);
  }
}

start()
