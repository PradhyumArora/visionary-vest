import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/prisma";
import {resolveMatchingOrders} from "@/app/actions/orders";
export async function POST(request: NextRequest, response: NextResponse) {
    const { userId, quantity, price, influencer } = await request.json()

    let existingUser = await prismadb.user.findUnique(({
        where: {
            id: userId
        }
    }))
    if(quantity * price > existingUser?.fundsAvailable!){
        return Response.json({status: "fail"})
    }
    if(!existingUser) {
        existingUser = await prismadb.user.create({
            data: {
                id: userId
            }
        })
    }
    console.log("3")

    const newOrder = await prismadb.order.create({
        data: {
            influencerId: influencer.data.id,
            price,
            quantity
        }
    })
    console.log("4")

    await prismadb.activeBuyOrders.create({
        data: {
            userId: existingUser.id,
            orderId: newOrder.id
        }
    })
    // await resolveMatchingOrders({
    //     existingUser: existingUser.id , influencerId: influencer.data.id
    // });
    console.log("WILL created")
    return Response.json({status:"success"})
}