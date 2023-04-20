var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Customer = require('./models/Customer');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var customerRouter = require('./routes/Customer');
var boardRouter = require('./routes/board');
var selectorRouter = require('./routes/Selector');
var resourceRouter = require('./routes/resource');


require('dotenv').config();
const connectionString =
process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString,
{useNewUrlParser: true,
useUnifiedTopology: true});



var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Customer', customerRouter);
app.use('/board', boardRouter);
app.use('/Selector', selectorRouter);
app.use('/resource', resourceRouter);


// We can seed the collection if needed on server start
async function recreateDB(){
  // Delete everything
  await Customer.deleteMany();
  
  let instance1 = new
  Customer({
    Cust_Name:"Mounitha",Cust_Age :20,Mail_Id:"vemulamounitha@gmail.com"
  });
 instance1.save().then(()=>{
   console.log("First object saved")
 }).catch((err)=>{
   console.log(err);
 })

 let instance2 = new
  Customer({
   Cust_Name:"Mahesh",Cust_Age :25,Mail_Id:"mahesh66@gmail.com"  
  });
 instance2.save().then(()=>{
   console.log("Second object saved")
 }).catch((err)=>{
   console.log(err);
 });
 
 let instance3 = new
  Customer({
    Cust_Name:"Jo",Cust_Age :30,Mail_Id:"joyce@gmail.com"
  });
  instance3.save().then(()=>{
   console.log("Third object saved")
 }).catch((err)=>{
   console.log(err);
 });
 }
 let reseed = true;
 if (reseed) { recreateDB();}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
