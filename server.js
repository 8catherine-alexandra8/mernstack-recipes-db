const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();
require('dotenv').config();


const PORT = process.env.PORT || 8080;
const routes = require('./routes/api')

const uri = process.env.MONGODB_URI


mongoose.connect(uri || 'mongodb://localhost/recipe_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('tiny'));
app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}


app.listen(PORT, console.log(`Server is starting on ${PORT}`));






