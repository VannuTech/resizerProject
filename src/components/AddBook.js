import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import  {validate} from './Validation';
import { createSession } from './apis';
import axios from "axios";

const AddBook = () => {

    const initialValues = { book_name : "",
    issue_date : "",
    author_name : ""
      }

    const[formValues, setformValues] = useState(initialValues);
    const[formError, setformError] = useState("");

    const handleChange =(e)=>{
        const name = e.target.name;
        const value = e.target.value;
        setformValues({...formValues, [name] : value})
    }


//     const handleSubmit = async (e) => {
//       e.preventDefault();

//       // const errors = validate();
//       // if (Object.keys(errors).length !== 0) {
//       //     return; 
//       // }
// try{
//       const reponse = await axios.post('http://localhost:8082/api/v1/createContact' , formValues)
//       console.log(reponse);
      

//       } catch (error){
          
//       }

//       try {
//           const response = await axios.post('http://localhost:8082/api/v1/createContact', formValues);
//           alert(JSON.stringify(response.data.message));
//           console.log('Data from API:', response);
//       } catch (error) {
//           if (error.response && error.response.data && error.response.data.errors) {
//               const backendErrors = error.response.data.errors;
//               let errorMessage = "";
//               backendErrors.forEach(err => {
//                   errorMessage += `${err.msg}`;
//               });
//               alert(errorMessage);
//           } else {
//               console.error('respose error from backend:', error);
//           }
//       }
//   }
    const handleSubmit = async(e) => {
        e.preventDefault();
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
            const response = await createSession(data);
            alert(JSON.stringify(response.data.message));
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
   
    </Form>
  );
}

export default AddBook;
