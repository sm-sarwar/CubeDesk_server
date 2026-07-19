import { OrderStatus } from "../../../generated/prisma/enums"
import { prisma } from "../../lib/prisma"

type CrateOrderPayload = {
    customerId: number
    totalAmount: number
    paidAmount?: number
    status?: 'pending' | 'shipped' | 'delivered' | 'cancelled'
    notes?: string
}

type TUpdateOrderPayload = {
    customerId?: number;
    orderDate?: Date;
    totalAmount?: number;
    status?: OrderStatus;
    notes?: string;
};

const orderCreate = async (payload: CrateOrderPayload) => {
    const result = await prisma.order.create({
        data: {
            customerId: payload.customerId,
            totalAmount: payload.totalAmount,
            paidAmount: payload.paidAmount ?? 0,
            status: payload.status ?? 'pending',
            notes: payload.notes ?? null
        },
        include: {
            customer: true
        }
    })
    return result
}

const getAllOrders = async () => {
    const result = await prisma.order.findMany()
    return result
}

const getOrderById = async (orderId: number) => {
    const order = await prisma.order.findUnique({
        where: {
            id: orderId
        }
    })

    if (!order) {
        throw new Error('order not found')
    }

    return order;
}

const deleteOrderById = async (orderId: number) => {
    const result = await prisma.order.delete({
        where: {
            id: orderId
        }
    })

    if (!result) {
        throw new Error(`Order with id ${orderId} not found`)
    }

    return result
}

const updateOrderById = async (orderId: number, payload: TUpdateOrderPayload) => {
    const updateData = {
        ...(payload.customerId !== undefined ? { customerId: payload.customerId } : {}),
        ...(payload.orderDate !== undefined ? { orderDate: payload.orderDate } : {}),
        ...(payload.totalAmount !== undefined ? { totalAmount: payload.totalAmount } : {}),
        ...(payload.status !== undefined ? { status: payload.status } : {}),
        ...(payload.notes !== undefined ? { notes: payload.notes } : {}),
    }

    const result = await prisma.order.update({
        where: {
            id: orderId
        },
        data: updateData
    })

    if(!result) {
        throw new Error(`Order with id ${orderId} not found`)
    }

    return result
}

export const ordersService = {
    orderCreate,
    getAllOrders,
    getOrderById,
    deleteOrderById,
    updateOrderById
}