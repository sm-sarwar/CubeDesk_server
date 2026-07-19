import express from 'express'
import auth, { UserRoles } from '../../middlewares/auth'
import { ordersController } from './orders.controller'
import { ordersService } from './orders.service'

const router = express.Router()


router.get ('/',
    auth(UserRoles.admin),
    ordersController.getAllOrders
)

router.get('/:orderId',
    auth(UserRoles.admin),
    ordersController.getOrderById
)

router.post ('/', 
    auth(UserRoles.admin),
    ordersController.orderCreate 
)

router.delete ('/:orderId',
    auth(UserRoles.admin),
   ordersController.deleteOrderById
    
)

export const ordersRouter = router