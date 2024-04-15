

const pool = require("./db");

exports.registerUserSecurely = async (req, res) => {
    const { email, password } = req.body;
    const query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
    try {
        await pool.query(query, [email, password]);
        res.status(201).send('User registered securely');
    } catch (err) {
        res.status(500).send('Error registering user securely');
    }
};

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;
    const query = `INSERT INTO users(email, password) VALUES ('${email}', '${password}')`;
    try {
        await pool.query(query);
        res.status(201).send('User registered successfully');
    } catch (err) {
        res.status(500).send('Error registering user');
    }
};

exports.registerUserCallProcedure = async (req, res) => {
    const { email, password } = req.body;
    try {
        await pool.query('CALL register_user($1, $2)', [email, password]);
        res.status(201).send('User registered via stored procedure');
    } catch (err) {
        res.status(500).send('Error registering user via stored procedure');
    }
};

function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
function isValidPassword(password) {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
}

exports.registerValidate = async (req, res) => {
    const { email, password } = req.body;
    if (!isValidEmail(email)) {
        return res.status(400).send('Invalid email format');
    }
    if (!isValidPassword(password)) {
        return res.status(400).send('Password must be at least 8 characters long and include at least one letter and one number');
    }
    const query = 'INSERT INTO users(email, password) VALUES ($1, $2)';
    try {
        await pool.query(query, [email, password]);
        res.status(201).send('User registered with input validation');
    } catch (err) {
        res.status(500).send('Error registering user with input validation');
    }
};