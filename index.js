const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/static", express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index', {});
});

app.get('/execute', (req, res) => {
    let sql = req.query.sql;
    if (sql !== undefined) {
        db.executeQuery(req, res);
        //console.log('Query received: ', JSON.stringify(req.query.sql));
    } else {
        res.redirect('/');
    }
});

app.listen(3000, () => console.log('server started'));