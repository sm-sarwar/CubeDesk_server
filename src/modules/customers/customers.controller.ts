import { Request, Response } from "express";
import { customersService } from "./customers.service";

const createCustomer = async (req: Request, res: Response) => {
    try {

        const result = await customersService.createCustomer(req.body)
        res.status(201).json({
            message: "Customer created successfully",
            data: result

        })
        console.log("customer create successfully", result)

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the customer",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}

const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const result = await customersService.getAllCustomers()
        res.status(200).json({
            message: "Customers fetched successfully",
            data: result
        })
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while fetching customers",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}


export const customersController = {
    createCustomer,
    getAllCustomers
}