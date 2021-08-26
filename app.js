const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
require('dotenv').config();
// Define routes starts
const { index } = require('./Routes/home.routes');
const register = require("./Routes/register_routes");
const login = require("./Routes/login_routes");
const confirm = require("./Routes/confirm_routes");
const resend = require("./Routes/confirm_routes");
const forgotPassword = require("./Routes/forgotPassword");
const resetPassword = require("./Routes/reset_routes");
const services = require("./Routes/services");
const salonRoute = require("./Routes/salon");
const booking = require("./Routes/booking");
const profile = require("./Routes/profile");
const changePassword = require("./Routes/changePassword");
const SalonOwnerimage = require("./Routes/Salon_avatar");
const Customerimage = require("./Routes/customer_avatar");
const dashboard = require("./Routes/dashboard");
// const chatRoomRouter = require("./routes/chatRoom");
//const deleteRouter =require("./routes/delete");
// Define routes ends


// Connect to database
// connectDatabase();

const app = express();
// const http = require('http').createServer(app)
// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Cookie parser
app.use(cookieParser());



// logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Enable CORS
app.use(cors());
app.use(express.static(__dirname + '/public'))
// mount routers
app.use('/v1', index);
app.use('/register', register);
app.use('/', login);
app.use('/forgot-password', forgotPassword);
app.use('/reset-password', resetPassword);
app.use('/', services);
app.use('/confirm', confirm);
app.use('/', resend);
app.use('/', booking);
app.use('/', profile);
app.use(salonRoute);
app.use('/', changePassword);
app.use('/', SalonOwnerimage);
app.use('/', Customerimage);
app.use('/', dashboard);
//app.use("/users", userRouter);
// app.use("/room", decode, chatRoomRouter);
// app.use("/delete", deleteRouter);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
/** catch 404 and forward to error handler */
app.use('*', (req, res) => {
  return res.status(404).json({
    success: false,
    message: 'API endpoint doesnt exist'
  })
});
// global error handler
// app.use(errorHandler);
// // Socket 
// const io = require('socket.io')(http)

// io.on('connection', (socket) => {
//     console.log('Connected...')
//     socket.on('message', (msg) => {
//         socket.broadcast.emit('message', msg)
//     })

// })
module.exports = app;
