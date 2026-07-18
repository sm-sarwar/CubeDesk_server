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

router.delete('/:id',
    auth(UserRoles.admin),
    customersController.deleteCustomerById
)

router.patch('/:id',
    auth(UserRoles.admin),
    customersController.updateCustomerById
)

export const customersRouter = router;