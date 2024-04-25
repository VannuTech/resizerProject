import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import  {validate} from './Validation';
import { addBook } from './apis';


const AddBook = () => {
//declare the initial state
    const initialValues = { book_name : "",
    issue_date : "",
    author_name : ""
      }

    const[formValues, setformValues] = useState(initialValues);
    const[formError, setformError] = useState("");
    const [apiCallCount, setApiCallCount] = useState(parseInt(localStorage.getItem("apiCallCount")) || 0); 
   
    //set the count value to local storage, so that it could not change on reload
    useEffect(() => {
      localStorage.setItem("apiCallCount", apiCallCount);
  }, [apiCallCount]);

  //update the state
    const handleChange =(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setformValues({...formValues, [name] : value})
    }

//on filling the valid input, submit the details
    const handleSubmit = async(e) => {
        e.preventDefault();
        //input validation
        const errors = validate(formValues);
        setformError(errors);
        if (
            errors.book_nameErr === "" &&
            errors.issue_dateErr === "" &&         
            errors.author_nameErr === ""           
          
        ) {         
           
            const data = {            
              "book_name": formValues.book_name,           
              "issue_date": formValues.issue_date,            
              "author_name": formValues.author_name,                                       
             }
            const response = await addBook(data);
            alert(JSON.stringify(response.data.message));
//increase the count on calling api

            setApiCallCount(apiCallCount + 1); 
            window.location.reload();

        } else {            
            alert("Please fill correct details.");
        }
    };

    

  return (
    <Form style={{margin : "20px"}}>
        <h4 className="mb-3 d-block">Add Books</h4>
       
      <Form.Group className="mb-3" >
        <Form.Label >Book Name </Form.Label>
        <Form.Control type="text" placeholder="Enter book name" name="book_name" value={formValues.book_name} onChange={handleChange} />
        {formError && formError.book_nameErr && <p style={{color : "red"}}>Please enter book name!</p>}
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label >Issue Date</Form.Label>
        <Form.Control type="date"name="issue_date"value={formValues.issue_date} onChange={handleChange} />
        {formError && formError.issue_dateErr && <p style={{color : "red"}}>Please fill issue date!</p>}
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label >Author Name</Form.Label>
        <Form.Control type="text" name="author_name" value={formValues.author_name} onChange={handleChange} />      
         {formError && formError.author_nameErr && <p style={{color : "red"}}>Please type author name!</p>}
      </Form.Group>

  
        
<Row className="mb-3">
      <Col xs={12} className="d-flex justify-content-end">
        {/* <Button variant="light" className="mr-1">Cancel</Button> */}
        <Button variant="warning" onClick={handleSubmit}>+Add BOOK</Button>
      </Col>
    </Row>  
    <p>Total API calls: {apiCallCount}</p>
    </Form>
  );
}

export default AddBook;
