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

export async function resolveMatchingOrders() {
  const buyOrders = await prisma.activeBuyOrders.findMany({ orderBy: { orderId: 'asc' } })

  const sellOrders = await prisma.activeSellOrders.findMany({ orderBy: { orderId: 'asc' } });

  for (const buyOrder of buyOrders) {
    for (const sellOrder of sellOrders) {
        let buyOrder = await prisma.order.findUnique({
            where: {
                id: buyOrder.orderId
            }
        })
        let sellOrder = await prisma.order.findUnique({
            where: {
                id: sellOrder.orderId
            }
        })

      if (buyOrder.price === sellOrder.price) {

          // await prisma.user.update({where: {id: buyOrder.userId}, data: {balance: {increment: buyOrder.price * buyOrder.quantity}}})
          await prisma.completedOrders.create({data: { buyOrder }})
          await prisma.completedOrders.create({data: { sellOrder }})


          await prisma.activeBuyOrders.delete({where: {orderId: buyOrder.id}})
          await prisma.activeSellOrders.delete({where: {orderId: sellOrder.id}})

          matched = true;
          break;
      }
    }
  }

}