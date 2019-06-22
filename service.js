const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const static = require('express-static');
const router = express.Router();
const fs = require('fs');

var app = express();
app.listen(3000, () => {
    console.log('http://localhost:3000');
})
app.use(cookieParser());
var arr = [];
for(var i = 0; i < 1000; i++) {
    arr.push('KEYS_SIS'+Math.random()*1000);
}
app.use(cookieSession({
    keys: arr,
    name: 'sid',
    maxAge: 4*3600*1000
}))
app.use(bodyParser.urlencoded({extended: false}));
const index = router.get('/', (req, res) => {
    console.log(req.query, req.body, req.cookies, req.session);
    fs.readFile('./index.html', 'utf-8', (err, data) => {
        if(err) {
            res.send('404').end()
        }else {
            res.send(data).end()
        }
    })
})
app.use(index)
app.use(static('./src'))
