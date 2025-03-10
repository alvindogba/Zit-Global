import axios from 'axios';
const baseUrl= "http://localhost:5000/api"

export const NewRegistry=async(formData: any)=>{
    try {
        await axios.post(`${baseUrl}/admission`, formData)
    } catch (error) {
        console.log(error)
    }
}

