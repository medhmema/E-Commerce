const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = express();
dotenv.config();


//importing routes
const userRoute = require('./routes/userRoute');
const authRoute = require('./routes/authRoute');
const announcementRoute = require('./routes/announcementRoute');
const orderRoute = require('./routes/orderRoute');
const feedbackRoute = require('./routes/feedbackRoute');

//middlewares
app.use(express.json());


//connecting to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true },)
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));


//routes
app.use('/', authRoute);
app.use('/user', userRoute);
app.use('/announcement', announcementRoute);
app.use('/order', orderRoute);
app.use('/feedback', feedbackRoute);

app.listen(process.env.port, () => console.log('Running'));