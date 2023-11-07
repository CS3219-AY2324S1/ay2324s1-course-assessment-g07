const pool = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../jwt-generator');

const getAllUsers = async (req, res, next) => {
  try {
    const users = await pool.query('SELECT * FROM users');

    if (users.rows.length === 0) {
      return res.status(401).json({ message: 'No users found!' });
    }

    res.json({ users: users.rows });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const getUser = async (req, res, next) => {
  const userId = req.query.userId;
  console.log(userId)
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [
      userId,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).json({ message: 'User not found!' });
    }

    res.json({ user: user.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const login = async (req, res, next) => {
  console.log('login');
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Invalid username or password 1' });
    }

    const validPassword = await bcrypt.compare(password, user.rows[0].password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: 'Invalid username or password 2' });
    }
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token: token, user: user.rows[0] });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const register = async (req, res, next) => {
  console.log('register');
  const { username, email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);

    if (user.rows.length > 0) {
      return res
        .status(401)
        .json({ message: 'This email already has an account!' });
    }

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const verify = async (req, res, next) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const updateUser = async (req, res, next) => {
  const { username, email, oldUsername, oldEmail } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND email = $2',
      [oldUsername, oldEmail]
    );

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Unable to find old user record!' });
    }

    const updatedUser = await pool.query(
      'UPDATE users SET username = $1, email = $2 WHERE username = $3 AND email = $4 RETURNING *',
      [username, email, oldUsername, oldEmail]
    );

    const updatedUserDetail = updatedUser.rows[0];
    res.json({ updatedUserDetail });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

const deleteUser = async (req, res, next) => {
  const { oldUsername, oldEmail } = req.body;

  try {
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND email = $2',
      [oldUsername, oldEmail]
    );

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: 'Unable to find old user record!' });
    }

    await pool.query('DELETE FROM users WHERE username = $1 AND email = $2', [
      oldUsername,
      oldEmail,
    ]);

    res.json({ user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

exports.getAllUsers = getAllUsers;
exports.getUser = getUser;
exports.login = login;
exports.register = register;
exports.verify = verify;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
