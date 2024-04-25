import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { getBooksList } from './apis';
import { validate } from './Validation';
import {updateBook} from './apis'

const BookList = () => {
    const [formValues, setFormValues] = useState([]);
    const [formError, setFormError] = useState({});
    const [apiCallCount, setApiCallCount] = useState(parseInt(localStorage.getItem("apiCallCount")) || 0);

    useEffect(() => {
        getBooklist();
    }, []);

    useEffect(() => {
        localStorage.setItem("apiCallCount", apiCallCount); 
    }, [apiCallCount]);
// get list of books
    const getBooklist = async () => {
        try {
            const response = await getBooksList();
            if (response.data.length > 0) {
                setFormValues(response.data);
            } else {
                setFormValues([]);
            }
        } catch (error) {
            console.error('Error fetching book list:', error);
        }
    }
// update state
    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedFormValues = [...formValues];
        updatedFormValues[index] = { ...updatedFormValues[index], [name]: value };
        setFormValues(updatedFormValues);
    }


    // To update the record, enter the field that need to be updated and then submit the data.
    const handleSubmit = async (e, index, id) => {
     
        e.preventDefault();

        //validate the data
        const errors = validate(formValues[index]);
        setFormError(errors);
        if (
            errors.book_nameErr === "" &&
            errors.issue_dateErr === "" &&
            errors.author_nameErr === ""
        ) {
            const data = {
                "book_name": formValues[index].book_name,
                "issue_date": formValues[index].issue_date,
                "author_name": formValues[index].author_name,
                "id" : id
            }
            const response = await updateBook(data);
            alert(JSON.stringify(response.data.message));
// count the times API called
            setApiCallCount(apiCallCount + 1); 
            window.location.reload();

        } else {
            alert("Please fill correct details.");
        }
    };

    return (
        <div style={{ margin: "20px" }}>
            <p>List of Books</p>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Book Name</th>
                        <th>Issue Date</th>
                        <th>Author Name</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {formValues.map((book, index) => (
                        <tr key={index}>
                            <td>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter book name"
                                    name="book_name"
                                    value={book.book_name}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {formError && formError.book_nameErr && <p style={{ color: "red" }}>Please enter book name!</p>}
                            </td>
                            <td> <Form.Control
                                    type="date"
                                    placeholder="Select issue date"
                                    name="issue_date"
                                    value={book.issue_date}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {formError && formError.issue_dateErr && <p style={{ color: "red" }}>Please enter book name!</p>}</td>
                            <td> <Form.Control
                                    type="text"
                                    placeholder="Enter author name"
                                    name="author_name"
                                    value={book.author_name}
                                    onChange={(e) => handleChange(e, index)}
                                />
                                {formError && formError.author_nameErr && <p style={{ color: "red" }}>Please enter author name!</p>}</td>
                            <td><button onClick={(e) => handleSubmit(e, index, book.id)}>Update</button></td>
                            
                        </tr>
                       
                    ))}
                </tbody>
            </Table>
            <p>Total API calls: {apiCallCount}</p>
        </div>
    );
}

export default BookList;
