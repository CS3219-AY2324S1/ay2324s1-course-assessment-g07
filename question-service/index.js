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
  'http://localhost:8006',
  'http://35.188.89.73:30800',
  'http://35.188.89.73:30700',
  'http://35.188.89.73:30600',
  'http://35.188.89.73:30500',
  'http://35.188.89.73:30400',
  'http://35.188.89.73:30300',
  'http://35.188.89.73:30200',
  'http://35.188.89.73:30100',
  'http://35.188.89.73:30000',  
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

const questionRoutes = require('./routes/question-routes');

app.use('/questions', questionRoutes);

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(8001, () => {
      console.log('Server is running on port 8001');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas 1:', err);
  });

const connection = mongoose.connection;
connection.on('error', () => {
  console.log('Error connecting to MongoDB Atlas 2');
});