const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:8000',
  'http://localhost:8001',
  'http://localhost:8002',
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

// const userRoutes = require('./routes/matchmaking-routes');

// app.use('/users', userRoutes);

app.listen(8002, () => {
  console.log('Matchmaking service started on port 8002');
});
