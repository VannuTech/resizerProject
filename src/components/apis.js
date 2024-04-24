import axios from "axios";



export const login = async() => {
    const api_url = "https://l4d13c13xl.execute-api.ap-south-1.amazonaws.com/Prod/users/userlogin";
    const data = {
        "username":"dd@digicides.com",
       "password": "digi2023"
   }
   const headers = {
     "Content-Type": "application/json",
  };

  try{
    const response = await axios.post(api_url, data, {headers : headers});
      if(response.status === 200){
        return response.data.token
    }else {
        throw new Error('login failed')
    } 
  }catch (error){
    alert('something wrong')
        
  } 
}


export const createSession = async(data) => {
const bearer_token = await login()
// return bearer_token
const api_url = "https://x502uvbi0j.execute-api.ap-south-1.amazonaws.com/Prod/callsession/create"
const header = {
    Authorization : `Bearer ${bearer_token}`,
    "Content-Type": "application/json"
}
try{
    const response = await axios.post(api_url, data, {headers : header});
    console.log(data);
     if(response.status === 200){
        console.log(response.data.message);
        return response
    } 
  }catch (error){
    alert('something wrong')
        
  }
}

  