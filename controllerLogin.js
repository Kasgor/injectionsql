const pool = require('./db');

exports.setupDatabase = async (req, res) => {
    try {
        await pool.query('CREATE TABLE users (id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL)');
        await pool.query('CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(255) NOT NULL, price DECIMAL NOT NULL)');
        res.status(200).send({ message: "Successfully created tables" });
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
};


exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    try {
        const result = await pool.query(query);
        if (result.rows.length > 0) {
            res.send('Logged in successfully');
        } else {
            res.send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Login error');
    }
};

exports.loginUserSecurely = async (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    try {
        const result = await pool.query(query, [email, password]);
        if (result.rows.length > 0) {
            res.send('Logged in ');
        } else {
            res.send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Login error');
    }
};

exports.loginUserCallProcedure = async (req, res) => {
    const { email, password } = req.body;
    try {
        await pool.query('CALL login_user($1, $2)', [email, password]);
        res.status(200).send('Logged in ');
    } catch (err) {
        res.status(500).send('Error logging in ');
    }
};

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

exports.loginValidate = async (req, res) => {
    const { email, password } = req.body;
    if (!isValidEmail(email) || !isValidPassword(password)) {
        return res.status(400).send('Invalid email or password format');
    }
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    try {
        const result = await pool.query(query, [email, password]);
        if (result.rows.length > 0) {
            res.send('Logged in ');
        } else {
            res.send('Invalid credentials');
        }
    } catch (err) {
        res.status(500).send('Login error');
    }
};

