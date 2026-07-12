import express from 'express';
import { customersController } from './customers.controller';
import auth, { UserRoles } from '../../middlewares/auth';

const router = express.Router();

router.post('/', 
    auth(UserRoles.admin),
    customersController.createCustomer)

    
router.get('/', 
    auth(UserRoles.admin),
    customersController.getAllCustomers)

export const customersRouter = router;