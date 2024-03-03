"use server";
import prisma from "@/prisma";
import {Integer} from "asn1js";

// export async function getActiveBuyOrdersOfUserId(userId:any) {
//     try {
//         const activeBuyOrders = await prisma.activeBuyOrders.findMany({
//             where: {
//                 userId: userId, // Filter by userId
//             },
//         });
//
//
//
//         // map through the activeBuyOrder array and attach the influencer name to each order
//         activeBuyOrders.map(
//             async (order)=>{
//
//                     let activeOrder = await prisma.order.findUnique({
//                         where: {
//                             id: order.orderId
//                         }
//                     });
//
//                     let influencer = await prisma.influencer.findUnique({
//                         where: {
//                             id: activeOrder?.influencerId
//                         }
//                     });
//
//                     // The data we want
//                     return {
//                         ...activeOrder,
//                         ...influencer
//                     };
//         })
//
//         // The Data we get
//        return activeBuyOrders;
//
//     } catch (error) {
//         console.error("Error fetching active buy orders:", error);
//         throw error; // Re-throw the error or handle it as per your error handling strategy
//     }
// }

export async function getActiveBuyOrdersOfUserId(userId:any) {
    try {
        let activeBuyOrders = await prisma.activeBuyOrders.findMany({
            where: {
                userId: userId, // Filter by userId
            },
        });

        // map through the activeBuyOrder array and attach the influencer name to each order
        activeBuyOrders = await Promise.all(activeBuyOrders.map(async (order) => {
            let activeOrder = await prisma.order.findUnique({
                where: {
                    id: order.orderId
                }
            });

            let influencer = await prisma.influencer.findUnique({
                where: {
                    id: activeOrder?.influencerId
                }
            });
            const finalData = {
                ...order,
                ...activeOrder,
                ...influencer
            }
            return finalData
        }))
            // .then((data) => {
            //     console.log("Data--------------", data)
            //     // return data
            // });
        return activeBuyOrders;
    } catch (error) {
        console.error("Error fetching active buy orders:", error);
        throw error; // Re-throw the error or handle it as per your error handling strategy
    }
}

export async function getActiveSellOrdersOfUserId(userId:any) {
    try {
        const activeSellOrders = await prisma.activeSellOrders.findMany({
            select:{
                orderId:true
            },
            where: {
                userId: userId, // Filter by userId
            },
        });

        return activeSellOrders
    } catch (error) {
        console.error("Error fetching active buy orders:", error);
        throw error; // Re-throw the error or handle it as per your error handling strategy
    }
}
export async function getInfluencerByOrderId(id: number){
    const order = await prisma.order.findUnique({
        where: {
            id: id
        }
    });
    const influencer = await prisma.influencer.findUnique({
        where: {
            id: order.influencerId
        }
    });
    return influencer;

}
export async function findManyOrdersById(id: number[]){
    const orders = await prisma.order.findMany({
        where: {
            id: {
                in: id
            }
        }
    });
    return orders;
}
export async function fluctuateSharePrices() {
    // Calculate supply and demand based on active buy and sell orders
    const buyOrders = await prisma.activeBuyOrders.findMany({ include: { order: true } });
    const sellOrders = await prisma.activeSellOrders.findMany({ include: { order: true } });
    const totalBuyQuantity = buyOrders.reduce((acc, order) => acc + order.order.quantity, 0);
    const totalSellQuantity = sellOrders.reduce((acc, order) => acc + order.order.quantity, 0);

    // Determine the mechanism for adjusting share prices based on supply and demand
    let priceChangeFactor = 0; // Default to no change
    if (totalBuyQuantity > totalSellQuantity) {
        // Increase price when demand is higher than supply
        priceChangeFactor = 0.05; // For example, increase by 5%
    } else if (totalBuyQuantity < totalSellQuantity) {
        // Decrease price when supply is higher than demand
        priceChangeFactor = -0.05; // For example, decrease by 5%
    }

    // Update influencer prices based on the calculated factor
    const influencers = await prisma.influencer.findMany();
    const updatedInfluencers = [];
    for (const influencer of influencers) {
        const updatedPrice = influencer.currentPrice * (1 + priceChangeFactor);
        const updatedInfluencer = await prisma.influencer.update({
            where: { id: influencer.id },
            data: { currentPrice: updatedPrice }
        });
        updatedInfluencers.push(updatedInfluencer);
    }

    return updatedInfluencers;
}

export async function resolveMatchingOrders({existingUser, influencerId}: any) {
    const buyOrders = await prisma.activeBuyOrders.findMany({ orderBy: { orderId: 'asc' }, include: { order: true } });
    const sellOrders = await prisma.activeSellOrders.findMany({ orderBy: { orderId: 'asc' }, include: { order: true } });

    for (const buyOrder of buyOrders) {
        for (const sellOrder of sellOrders) {
            const buyOrderDetails = buyOrder.order;
            const sellOrderDetails = sellOrder.order;

            if (buyOrderDetails && sellOrderDetails) {
                if (sellOrderDetails.price <= buyOrderDetails.price) {
                    const fundsRequired = sellOrderDetails.price * buyOrderDetails.quantity;

                    // Add influencer to the user's current stock holdings
                    await prisma.stockHolding.create({
                        data: {
                            influencerId,
                            buyPrice: sellOrderDetails.price,
                            quantity: buyOrderDetails.quantity,
                            userId: existingUser
                        } as any // <--- Adding this as a workaround for the typing issue
                    });

                    // Move buy order to completed orders
                    await prisma.completedOrders.create({
                        data: {
                            order: { connect: { id: buyOrderDetails.id } }
                        } as any
                    });

                    // Remove buy order from active buy orders
                    await prisma.activeBuyOrders.delete({ where: { id: buyOrder.id } });

                    // Remove sell order from active sell orders
                    await prisma.activeSellOrders.delete({ where: { id: sellOrder.id } });

                    // Exit the loop for this buy order
                    break;
                }
            }
        }
    }
}




