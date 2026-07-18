import { Request, Response } from "express";
import { customersService } from "./customers.service";

const createCustomer = async (req: Request, res: Response) => {
    try {

        const result = await customersService.createCustomer(req.body)
        res.status(201).json({
            message: "Customer created successfully",
            data: result

        })

    } catch (error) {
        res.status(500).json({
            message: "An error occurred while creating the customer",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}




const getAllCustomers = async (req: Request, res: Response) => {
    try {
        const { search } = req.query
        const division = req.query.division
        const source = req.query.source
        const result = await customersService.getAllCustomers({ search: search as string }, division as string, source as string)
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



const deleteCustomerById = async (req: Request, res: Response) =>{
    try{
        const { id } = req.params;
        const result = await customersService.deleteCustomerById(Number(id))
        res.status(201).json({
            message: "Customer deleted successfully",
            data: result
        })

    } catch(error) {
        res.status(500).json({
            message: "An error occurred while deleting the customer",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }
}

const updateCustomerById = async (req: Request, res: Response) =>{
    try {
        const { id }= req.params;
        const result = await customersService.updateCustomerById(Number(id), req.body)
        res.status(200).json({
            message: "Customer updated successfully",
            data: result
        })
    } catch(error: any) {

        if (error.code === 'P2025') {
            return res.status (404).json({
                message: "Customer not found",
            })
        }

        res.status(500).json({
            message: "An error occurred while updating the customer",
            error: error instanceof Error ? error.message : "Unknown error"
        })
    }

}

export const customersController = {
    createCustomer,
    getAllCustomers,
    deleteCustomerById,
    updateCustomerById
}