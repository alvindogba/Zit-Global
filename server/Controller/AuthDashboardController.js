
export const portal = async(req, res)=>{
    try{
            console.log("Authorize")// console
            res.redirect("http://localhost:5173/login")
    }
    catch(err){
        console.error("Not Authorize", err.message)
    }
}

// Tutor 
export const tutor = async(req, res)=>{
    try{
            console.log("Authorize")// console
            res.redirect("http://localhost:5173/tutor/dashboard")
    }
    catch(err){
        console.error("Not Authorize", err.message)
    }
}

// Tutees
export const tutees = async(req, res)=>{
    try{
            console.log("Authorize")// console
            res.redirect("http://localhost:5173/tutee/dashboard")
    }
    catch(err){
        console.error("Not Authorize", err.message)
    }
}
