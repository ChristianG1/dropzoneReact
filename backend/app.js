const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
const cloudinary = require('cloudinary').v2; 

cloudinary.config({
  cloud_name: 'animarama',
  api_key: '582849666733499',
  api_secret: 'h4pINPua-PaMVl3bTyjCFTkAPNc'
})

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.post('/upload', async(req, res, next) => {
  const { images } = req.body;
  res.send(images);
})

app.use('/api', require('./routes/api.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});


app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
