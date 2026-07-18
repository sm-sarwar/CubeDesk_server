import { Request, Response } from "express";
import { ordersService } from "./orders.service";

const orderCreate = async( req: Request, res: Response) => {
    try {

        const { customerId, totalAmount, paidAmount, status, notes } = req.body;

        if ( !customerId || totalAmount === undefined ) {
            return res.status(400).json({
                message: 'customerId and totalAmount are required'
            });
        }

        const result = await ordersService.orderCreate({
            customerId : Number(customerId),
            totalAmount : Number(totalAmount),
            paidAmount : paidAmount !== undefined ? Number(paidAmount) : 0,
            status,
            notes

        })
        res.status(201).json({
            message: 'Order created successfully',
            data: result
        })

    } catch (error : any) {

        if (error.code === 'P2003') {
            return res.status(404).json({ message: "Customer not found" })
        }

        res.status(500).json({
            message: error.message || 'Internal Server Error',
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}

export const ordersController = {
    orderCreate
}