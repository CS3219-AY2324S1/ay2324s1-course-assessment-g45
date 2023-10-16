const mysql = require('mysql2/promise');
require('dotenv').config();
const pool = require('../server')

// Create a user
// async function createUser(username, password, email) {
//   try {
//     const connection = await pool.getConnection(); // Get a connection from the pool

//     // Use the connection to query the database with placeholders
//     const [result] = await connection.query(
//       'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
//       [username, password, email]
//     );

//     connection.release(); // Release the connection back to the pool

//     return result;
//   } catch (error) {
//     if (error.code == 'ER_DUP_ENTRY') {
//       var errMsg = error.sqlMessage.split(" ")[2] + " is already in use.";
//     } else {
//       var errMsg = error.sqlMessage;
//     }
//   console.log(errMsg);
//   //return res.status(400).json({error: errMsg})
//   }
// }

const createUser = async (req, res) => {
  const { username, password, email } = req.body

  try {
    const connection = await pool.getConnection(); // Get a connection from the pool

    // Use the connection to query the database with placeholders
    const [result] = await connection.query(
      'INSERT INTO users (username, password, email) VALUES (?, ?, ?)',
      [username, password, email]
    );

    connection.release();

    return res.status(200).json(result)

  } catch (error) {

    if (error.code == 'ER_DUP_ENTRY') {
      var errMsg = error.sqlMessage.split(" ")[2] + " is already in use.";
    } else {
      var errMsg = error.sqlMessage;
    }

    return res.status(400).json({ error: errMsg })
  }
}

// Get all users
// async function getAllUsers() {
//   try {
//     const connection = await pool.getConnection(); // Get a connection from the pool

//     // Use the connection to query the database
//     const [rows] = await connection.query(`SELECT * FROM users`);

//     connection.release(); // Release the connection back to the pool

//     return rows;
//   } catch (error) {
//     console.error(error);
//   }
// }

// Get a user from username
// async function getSingleUser(id) {
//   try {
//     const connection = await pool.getConnection(); // Get a connection from the pool

//     // Use the connection to query the database
//     const [rows] = await connection.query(`SELECT * FROM users WHERE id = ?`, [id]);

//     connection.release(); // Release the connection back to the pool

//     return rows;
//   } catch (error) {
//     console.error(error);
//   }
// }

const getSingleUser = async (req, res) => {
  const { id } = req.params
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool

    // Use the connection to query the database
    const [rows] = await connection.query(`SELECT * FROM users WHERE id = ?`, [id]);

    connection.release(); // Release the connection back to the pool

    if (rows.length == 0) {
      return res.status(400).json("No such user.");
    }

    return res.status(200).json(rows)

  } catch (error) {
    return res.status(400).json(error)
  }
}

// Update a user
// async function updateUserFunction(id, username, password, email) {
//   try {
//     const connection = await pool.getConnection();

//     const updateFields = [];
//     const updateValues = [];

//     // Check if the username is provided and add it to the update query
//     if (username) {
//       updateFields.push('username = ?');
//       updateValues.push(username);
//     }

//     // Check if the password is provided and add it to the update query
//     if (password) {
//       updateFields.push('password = ?');
//       updateValues.push(password);
//     }

//     // Check if the email is provided and add it to the update query
//     if (email) {
//       updateFields.push('email = ?');
//       updateValues.push(email);
//     }

//     // Construct the SQL update query
//     const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

//     // Add the username to the values array for the WHERE clause
//     updateValues.push(id);

//     // Execute the update query
//     const [result] = await connection.query(updateQuery, updateValues);

//     connection.release();

//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

const updateUser = async (req, res) => {
  const { id } = req.params

  try {
    const connection = await pool.getConnection();

    const updateFields = [];
    const updateValues = [];

    // Check if the username is provided and add it to the update query
    if (username) {
      updateFields.push('username = ?');
      updateValues.push(username);
    }

    // Check if the password is provided and add it to the update query
    if (password) {
      updateFields.push('password = ?');
      updateValues.push(password);
    }

    // Check if the email is provided and add it to the update query
    if (email) {
      updateFields.push('email = ?');
      updateValues.push(email);
    }

    // Construct the SQL update query
    const updateQuery = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;

    // Add the username to the values array for the WHERE clause
    updateValues.push(id);

    // Execute the update query
    const [result] = await connection.query(updateQuery, updateValues);

    connection.release();

    if (result.affectedRows == 0) {
      return res.status(400).json({ error: "No such user." })
    }

    return result;
  } catch (error) {

    if (error.code == 'ER_DUP_ENTRY') {
      var errMsg = error.sqlMessage.split(" ")[2] + " is already in use.";
    } else {
      var errMsg = error.sqlMessage;
    }

    return res.status(400).json({ error: errMsg })
  }
}


// Delete a user
// async function deleteUserFunction(id) {
//   try {
//     const connection = await pool.getConnection(); // Get a connection from the pool

//     // Use the connection to query the database
//     const [result] = await connection.query(`DELETE FROM users WHERE id = ?;`, [id]);

//     connection.release(); // Release the connection back to the pool
//     console.log(result)
//     return result;
//   } catch (error) {
//     console.error(error);
//   }
// }

const deleteUser = async (req, res) => {
  const { id } = req.params
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool

    // Use the connection to query the database
    const [result] = await connection.query(`DELETE FROM users WHERE id = ?;`, [id]);

    connection.release(); // Release the connection back to the pool

    if (result.affectedRows == 0) {
      return res.status(400).json({ error: "No such user." })
    }

    return res.status(200).json();
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res) => {
  const { username, password } = req.body
  //async function login(username, password) {
  try {
    const connection = await pool.getConnection(); // Get a connection from the pool

    // Use the connection to query the database
    const [rows] = await connection.query(`SELECT password FROM users WHERE username = ?;`, [username]);

    connection.release(); // Release the connection back to the pool

    if (rows.length == 0) {
      return res.status(400).json({ error: "No such user." })
    }

    if (rows[0].password != password) {
      return res.status(400).json({ error: "Wrong password." })
    }

    return res.status(200).json()

  } catch (error) {
    return res.status(400).json(error);
  }
}

// Call the async function to execute the database query
// (async () => {
//   login("updatedTestUser2", "pasasdsword2")
//     // .then(() => {
//     //   deleteUserFunction('TestUser2');
//     // })
//     .then(result => {
//       console.log(result);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// })();
module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  deleteUser,
  updateUser,
  login
}