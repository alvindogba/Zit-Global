import express from 'express';
import  {portal, tutor, tutees}  from '../Controller/AuthDashboardController.js';
const portalRouter = express.Router();"" //Creating the router middleware

portalRouter.get("/auth", portal)
portalRouter.get("/tutor", tutor)
portalRouter.get("/tutee", tutees)

export default portalRouter
