import axios from "axios";

//api to add data
export const addBook = async(data) => {
const api_url = "http://localhost:8082/api/v1/addBook"

try{
    const response = await axios.post(api_url, data);
    console.log(data);
     if(response.status === 200){
        console.log(response);
        return response
    } 
  }catch (error){
    alert('something wrong')
        
  }
}

//api to update data

export const updateBook = async(data) => {
    const api_url = "http://localhost:8082/api/v1/updateBookById"
 
    try{
        const response = await axios.post(api_url, data);
        console.log( "mnmnm", data);
         if(response.status === 200){
            console.log(response);
            return response
        } 
      }catch (error){
        alert('something wrong')
            
      }
    }

    //api to get data
export const getBooksList = async(data) => {
    const api_url = "http://localhost:8082/api/v1/getBooksList"
    
    try{
        const response = await axios.get(api_url, data);
           console.log(response.data.data);
         if(response.status === 200){
            console.log(response);
            return response.data
        } 
      }catch (error){
        alert('something wrong')
            
      }
    }

  