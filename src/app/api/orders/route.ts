import { NextRequest, NextResponse } from 'next/server'
import { createOrder } from '@/lib/queries'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validate required fields
        const { customerName, email, phone, items, totalAmount } = body

        if (!customerName || !email || !phone || !items || items.length === 0) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const order = await createOrder({
            customerName,
            email,
            phone,
            company: body.company,
            items,
            totalAmount,
            notes: body.notes,
        })

        return NextResponse.json(order)
    } catch (error) {
        console.error('Order creation error:', error)
        return NextResponse.json(
            { error: 'Failed to create order' },
            { status: 500 }
        )
    }
}
