import express from 'express'
import auth, { UserRoles } from '../../middlewares/auth'
import { ordersController } from './orders.controller'

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

router.patch('/:orderId',
    auth(UserRoles.admin),
    ordersController.updateOrderById
)


export const ordersRouter = router