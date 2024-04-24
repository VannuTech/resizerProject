
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    database: "grp",
    host: "localhost",
    user: "root",
    password: "Code@12345",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

exports.getContactsByDetails=async(param) => {
    try {
        const queryString = "SELECT id FROM `bookList` WHERE `book_name` = ? AND `issue_date` = ? AND `author_name` = ?";
        const [rows, fields] = await pool.query(queryString, [param.book_name, param.issue_date, param.author_name]);
        return rows[0]; // Return the first row if found
      } catch (err) {
        console.error(err);
        throw err;
      }
  }


exports.getContacts = async (req) => {
    try {
      let where = "";
      const condition = " WHERE 1=1 " + where + " ";
      const queryString =
        "SELECT id, book_name, issue_date, author_name  FROM `bookList` " + condition;
        const [rows, fields] = await pool.query(queryString);
         return rows;
    
    } catch (err) {
      console.error(err);
      throw err;
    }
};

exports.deleteAllContacts= async() => {
    try {
        const queryString = "DELETE FROM `bookList`";
        await pool.query(queryString);
      } catch (err) {
        console.error(err);
        throw err;
      }
  }
  
exports.createContacts = async (param) => {
    try {
        const connection = await pool.getConnection();
        const query = "INSERT INTO bookList SET `book_name` = ?, `issue_date` = ?, `author_name` = ?";
        const values = [param.book_name, param.issue_date, param.author_name];
        const result = await connection.execute(query, values);
        connection.release();
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

exports.updateBook = async(bookId, param) => {
    try {
      const queryString = "UPDATE `bookList` SET `book_name` = ?, `issue_date` = ?, `author_name` = ? WHERE `id` = ?";
      const values = [param.book_name, param.issue_date, param.author_name, bookId];
      const [result] = await pool.query(queryString, values);
      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
