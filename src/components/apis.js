import axios from "axios";




export const createSession = async(data) => {
const api_url = "http://localhost:8082/api/v1/createContact"

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

  