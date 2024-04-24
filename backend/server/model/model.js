
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
