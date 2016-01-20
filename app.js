var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = 80;

var nav = [{
    Link: '/Books',
    Text: 'Book'
}, {
    Link: '/Authors',
    Text: 'Author'
}];

var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(express.static('src/views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./src/config/passport')(app); // pull config/passport in and execute all of it and pass it into app

app.set('views', './src/views');
app.set('view engine', 'html');

app.use('/Auth', authRouter);


app.get('/', function(req, res){
    res.render('index');
});

app.get('/books', function(req, res){
    res.send('Hello Books');
});

app.listen(port, function(err){
    console.log('running server on port', port);
});