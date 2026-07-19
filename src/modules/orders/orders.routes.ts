import express from 'express'
import auth, { UserRoles } from '../../middlewares/auth'
import { ordersController } from './orders.controller'

const router = express.Router()


router.get ('/',
    auth(UserRoles.admin),
    ordersController.getAllOrders
)

router.post ('/', 
    auth(UserRoles.admin),
    ordersController.orderCreate 
)

export const ordersRouter = router