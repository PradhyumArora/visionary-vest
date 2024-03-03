import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/prisma";
import {log} from "node:util";
export async function POST(request: NextRequest, response: NextResponse) {
    const { userId, quantity, price, influencer } = await request.json()
    let qty = quantity;
    let existingUser = await prismadb.user.findUnique(({
        where: {
            id: userId
        }
    }))

    if(!existingUser) {
        throw new Error("User not found")
    }

    const userStockHoldings = await prismadb.stockHolding.findFirst({
        where:{
            userId: existingUser.id,
            AND: {
                influencerId: influencer.data.id,
                AND: {
                    quantity: {
                        gt: qty
                    }
                }
            }
        }
    })
    /**/console.log(userStockHoldings, "userStockHoldings")
     if(!userStockHoldings) {
        return Response.json({status: "fail"})
    }


    const newOrder = await prismadb.order.create({
        data: {
            influencerId: influencer.data.id,
            price,
            quantity
        }
    })

    await prismadb.activeSellOrders.create({
        data: {
            userId: existingUser.id,
            orderId: newOrder.id
        }
    })

    return Response.json({status:"success"})
}