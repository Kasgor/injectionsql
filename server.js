const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Import routes
const routes = require('./routes');
app.use(routes);


app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/login.html`)
});

app.get('/register', (req, res) => {
    res.sendFile(`${__dirname}/register.html`)
});

app.listen(port, () => console.log(`Server listening to port: ${port}`));
