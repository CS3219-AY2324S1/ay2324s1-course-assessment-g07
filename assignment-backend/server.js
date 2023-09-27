const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http'); 
const createWebSocketServer = require('./controllers/matchmaking-controller');
require('dotenv').config();

const app = express();
const server = http.createServer(app); // Create an HTTP server
const wss = createWebSocketServer(server); 

app.use(express.json());
// app.use(cors());
const allowedOrigins = [
  // 'http://alb-peerprep-2137662650.ap-southeast-1.elb.amazonaws.com', // production deployment
  'http://localhost:3000',
];
// only allows requests coming in from allowed origins
app.use(
  cors({
    credentials: true,
    // origin: true,
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
const userRoutes = require('./routes/user-routes');

app.use('/questions', questionRoutes);
app.use('/users', userRoutes);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//   );
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PATCH, DELETE, OPTIONS'
//   );
//   next();
// });

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas 1:', err);
  });

const connection = mongoose.connection;
connection.on('error', () => {
  console.log('Error connecting to MongoDB Atlas 2');
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`web socket server is running on port ${port}`);
});
