const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');


const app = express();

const desks = require('./app/routes/desk.route');
const groupFood = require('./app/routes/group_food.route');
const food = require('./app/routes/food.route');
const order = require('./app/routes/order.route');
const orderDetail = require('./app/routes/order_detail.route');
const place = require('./app/routes/place.route');
const user = require('./app/routes/user.route');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/desk', desks);
app.use('/groupfood', groupFood);
app.use('/food', food);
app.use('/order', order);
app.use('/orderdetail', orderDetail);
app.use('/place', place);
app.use('/user', user);


app.use((req, res, next) => {
    const err = new Error('Not found!');
    err.status = 404;
    next(err);
});

app.use((req, res, next) => {
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    res.status(status).json({
        error: {
            message: error.message
        }
    });
});



module.exports = app;
