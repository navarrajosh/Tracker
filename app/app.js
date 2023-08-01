var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var db = require('./config/database');

var indexRouter = require('./routes/index');
var searchRessultRouter = require ('./routes/empsearch');
var adminRouter = require('./routes/admin');
var loginRouter = require('./routes/login');
var adminHomeRouter = require('./routes/adminHome');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/empsearch', searchRessultRouter);
app.use('/login', loginRouter);
app.use('/adminHome', adminHomeRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// mysql connection definition
// Create MySQL connection


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});

const port = 3000

app.get('/', (req, res) => {
res.send("Hello World!")
})

// app.post('/query/search', (req,res)=> {
//   const userInput = req.body.query;
//   var query = "SELECT * FROM users where eid = ?";
//   let param = "/query/" + userInput;
//   database.executeQuery(userInput, (err,results) =>{
//     if(err){
//       console.error('Error tae')
//       return res.status(500).send('Error tae2')
//     }
//    res.redirect(param);
//   });
// });


// app.get('/query', (req,res) => {
//   const result = req.params.result;
//   res.render('result', {data: results});
// })


// search function


app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
module.exports = app;

