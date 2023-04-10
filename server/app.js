require('dotenv').config();
require('express-async-errors');
const cors = require('cors');

const express = require('express');
const app = express();

const loginRouter = require('./routes/login');
const counterRouter = require('./routes/counter');

// app.use(express.static('./public'));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('<h1>API</h1>');
});

// app.get('/api/v1/login', (req, res) => {
//   res.send('<h1>login</h1>');
// });
//
// app.post('/api/v1/login', (req, res) => {
//   res.status(200).send('<h1>login 200</h1>');
// });



app.use('/api/v1', loginRouter);
app.use('/api/v1', counterRouter);



const port = process.env.PORT || 3000;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
