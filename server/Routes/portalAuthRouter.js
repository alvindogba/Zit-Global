import express from 'express';
import  {logInController, logOutController}  from '../Controller/PortalController.js'; // Importing the controller functions
const authRouter = express.Router();"" //Creating the router middleware

authRouter.post("/login", logInController)
authRouter.post("/logout", logOutController)

export default authRouter
