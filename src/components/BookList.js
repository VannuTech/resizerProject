import React from 'react';
import Table from 'react-bootstrap/Table';

const BookList = () => {
    const book = [
        {book_name : "jkjkjk", issue_date : "issue_date", author_name : "author_name" },
       
    ]
  return (
    <div style={{margin : "20px"}}>
        <h5 style = {{justifyContent : "center"}}>List of Books</h5>
      <Table striped bordered hover>
    
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Issue Date</th>
            <th>Author Name</th>
          </tr>
        </thead>
        <tbody>
          {book.map((book, index) => (
            <tr key={index}>
              <td>{book.book_name}</td>
              <td>{book.issue_date}</td>
              <td>{book.author_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default BookList;
