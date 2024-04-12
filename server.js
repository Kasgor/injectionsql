const express = require('express');
const pool = require('./db')
const port = 3000

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
    res.send("123123");
});

app.get('/setup', async (req, res) => {
    try {
        await pool.query('CREATE TABLE users ( id SERIAL PRIMARY KEY,email VARCHAR(255) UNIQUE NOT NULL,  password VARCHAR(255) NOT NULL)')
        await pool.query('CREATE TABLE products  ( id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,  price DECIMAL NOT NULL)')
        res.status(200).send({ message: "Successfully created tables" })
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

app.listen(port, () => console.log("Server listening to port:"+port))