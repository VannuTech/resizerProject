import React from "react";
import { Resizable } from "re-resizable";
import booksi from './images/books.jpg';
import BookList from "./components/BookList";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBook from "./components/AddBook";
import Row from 'react-bootstrap/Row';


const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "pink",
  
  
};

const App = () => (
  <> <Row>
  <Resizable
    style={style}
    defaultSize={{
      width: 600,
      height: 400,
      overflow: "hidden"
    }}
  >
    <BookList /> 
  </Resizable>
   <Resizable
   style={style}
   defaultSize={{
     width: 500,
     height: 500,
     overflow: "hidden"
     
   }}
   
 > 
   <AddBook
        />
  
 </Resizable>
 </Row>
  <Resizable
  style={style}
  defaultSize={{
    width: 600,
    height: 200,
    overflow: "hidden"
  }}
>
  001 <img src={booksi} alt="Books" style={{ maxHeight: "100%", maxWidth: "100%" }} />
</Resizable> </>
);
export default App
