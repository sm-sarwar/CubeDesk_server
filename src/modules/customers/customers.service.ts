import { Customer } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createCustomer = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.customer.create({
        data
    })
    return result;
}

const getAllCustomers = async () =>{
    const result = await prisma.customer.findMany()
    return result;
}


export const customersService = {
    createCustomer,
    getAllCustomers
}