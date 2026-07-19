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

const getAllOrders = async (req: Request, res: Response) =>{
    try {

        const { search } = req.query
        const  status = req.query.status

        const result = await ordersService.getAllOrders( {search: search as string}, status as string )
        res.status(200).json({
            message: 'Orders retrieved successfully',
            data: result
        })
    }catch (error : any) {
        res.status (500).json({
            message : error.message || 'Internal Server Error',
            error : error instanceof Error ? error.message : "Unknown error"
        })
    }
}

const getOrderById = async ( req: Request, res: Response) =>{
    try {
        const { orderId } = req.params
        const result = await ordersService.getOrderById(Number(orderId))
        res.status(200).json({
            message: 'Orders retrieved successfully',
            data: result
        })

    } catch(error: any) {

        if (error.code === 'P2025') {
            return res.status(404).json({
                message: "Order not found",
            })
        }
        res.status (500).json({
            message : error.message || 'Internal Server Error',
            error : error instanceof Error ? error.message : "Unknown error"
        })
    }
}

const deleteOrderById = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        const result = await ordersService.deleteOrderById(Number(orderId))
         res.status(200).json({
            message: 'Orders deleted successfully',
            data: result
        })

    }catch(error: any) {

        if (error.code === 'P2025') {
            return res.status(404).json({
                message: "Customer not found",
            })
        }

        res.status (500).json({
            message : error.message || 'Internal Server Error',
            error : error instanceof Error ? error.message : "Unknown error"
        })
    }

}


const updateOrderById = async (req: Request, res: Response) =>{
    try {
        const { orderId } = req.params
        const result = await ordersService.updateOrderById(Number(orderId), req.body)
        res.status(200).json({
            message: "Order updated successfully",
            data: result
        })

    } catch(error : any ) {
        if (error.code === 'P2025') {
            return res.status (404).json({
                message: "Order not found",
            })
        }

        res.status(500).json({
            message: "An error occurred while updating the Order",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}


export const ordersController = {
    orderCreate,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById
}