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
        orderBy : {
            createdAt : 'desc'
        }
    })
    return result;
}

const getCustomerById = async (id: number) =>{
    const result = await prisma.customer.findUnique({
        where: {
            id
        }
    })

    if (!result) {
        throw new Error (`Customer with id ${id} not found`);
    }

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

const updateCustomerById = async (id: number, data: Partial<Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>>) => {
    const result = await prisma.customer.update({
        where : {
            id
        },
         data
    })
    return result;
}


export const customersService = {
    createCustomer,
    getAllCustomers,
    deleteCustomerById,
    updateCustomerById,
    getCustomerById
}