import axios from 'axios';
const baseUrl= "http://localhost:5000/api"

export const NewRegistry=async(formData: any)=>{

    await axios.post(`${baseUrl}/admission`, formData)
}

