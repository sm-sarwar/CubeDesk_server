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

export const ordersService = {
    orderCreate,
    getAllOrders
}