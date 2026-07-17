import express from 'express';
import { customersController } from './customers.controller';
import auth, { UserRoles } from '../../middlewares/auth';

const router = express.Router();


router.get('/', 
    auth(UserRoles.admin),
    customersController.getAllCustomers)

router.post('/', 
    auth(UserRoles.admin),
    customersController.createCustomer)


// router.patch('/:id',
//     auth(UserRoles.admin),
//     customersController.updateCustomer)



export const customersRouter = router;