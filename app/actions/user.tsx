"use server";
import prisma from "@/prisma";
export async function fetchUserById(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });

  return user;
}

// export async function fetchUserByUsername(username: string) {
//   const user = await prisma.user.findUnique({
//     where: {
//       username: username,
//     },
//   });
//
//   return user;
// }
export async function fetchActiveOrdersByUserId(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      activeOrders: {
        where: {
          sellPrice: null
        }
      },
    },
  });

  return user?.activeOrders;
}

export async function fetchPastOrdersByUserId(id: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    include: {
      pastOrders: {
        where: {
          sellPrice: {
            not: null
          }
        }
      },
    },
  });

  return user?.pastOrders;
}

