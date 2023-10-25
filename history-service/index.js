const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000',
    'http://localhost:8001',
    'http://localhost:8002',
    'http://localhost:8003',
    'http://localhost:8004',
  ];
  
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      console.log(origin);
      console.log({ origin });
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          'The CORS policy for this site does not ' +
          'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.use(bodyParser.json());

const historyRoutes = require('./routes/history-routes');

app.use('/history', historyRoutes);

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(8006, () => {
      console.log('History server is running on port 8006');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas 1:', err);
  });

const connection = mongoose.connection;
connection.on('error', () => {
  console.log('Error connecting to MongoDB Atlas 2');
});