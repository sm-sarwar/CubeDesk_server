import { Customer, Prisma } from "../../../generated/prisma/client"
import { prisma } from "../../lib/prisma"

const createCustomer = async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await prisma.customer.create({
        data
    })
    return result;
}

const getAllCustomers = async (payload: { search?: string }, division: string, source: string) => {
    const { search } = payload;
    const andCondition: Prisma.CustomerWhereInput[] = []


    //  searching 
    if (search) {
        andCondition.push({
            OR: [
                {
                    name: { contains: search, mode: 'insensitive' },
                },
                {
                    phone: { contains: search, mode: 'insensitive' },
                },
                {
                    email : { contains: search, mode: 'insensitive' },
                }
            ]
        })
    }



    // division filtering 
    if (division) {
        andCondition.push({
            division
        })
    }

    // source filtering
    if (source) {
        andCondition.push ({
            source: source as any
        })
    }

    const whereCondition: Prisma.CustomerWhereInput = andCondition.length > 0 ? { AND: andCondition } : {}

    const result = await prisma.customer.findMany({
        where: whereCondition,
    })
    return result;
}

const deleteCustomerById = async (id: number) =>{
    const result = await prisma.customer.delete({
        where: {
            id
        }
    })
    return result;
}


export const customersService = {
    createCustomer,
    getAllCustomers,
    deleteCustomerById
}