import { prisma } from "../../lib/prisma"

type CrateOrderPayload = {
    customerId: number
    totalAmount: number
    paidAmount?: number
    status?: 'pending' | 'shipped' | 'delivered' | 'cancelled'
    notes?: string
}



const orderCreate = async (payload: CrateOrderPayload) =>{
    const result = await prisma.order.create({
        data : {
            customerId: payload.customerId,
            totalAmount: payload.totalAmount,
            paidAmount: payload.paidAmount ?? 0,
            status: payload.status ?? 'pending',
            notes: payload.notes ?? null
        },
        include: {
            customer : true
        }
    })
    return result
}

const getAllOrders = async () =>{
    const result = await prisma.order.findMany()
    return result
}

const getOrderById = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where : {
            id : orderId
        }
    })

    if(!order){
        throw new Error ('order not found')
    }

    return order;
}

const deleteOrderById = async( orderId: number) =>{
    const result = await prisma.order.delete({
        where: {
            id : orderId
        }
    })

    if (!result) {
        throw new Error (`Order with id ${orderId} not found`)
    }

    return result
}

export const ordersService = {
    orderCreate,
    getAllOrders,
    getOrderById,
    deleteOrderById
}