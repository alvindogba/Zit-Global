import axios from 'axios';
const baseUrl= "http://localhost:5000/"

export const NewRegistry=async(formData: any)=>{
    console.log(formData)
    try {
        await axios.post(`${baseUrl}admission/register`, formData)
    } catch (error) {
        console.log(error)
    }
}

