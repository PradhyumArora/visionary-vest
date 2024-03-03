import React from 'react';
import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from "@/components/ui/badge";
import prismadb from "@/prisma";
import { auth, currentUser } from "@clerk/nextjs";

import {getActiveBuyOrdersOfUserId,getActiveSellOrdersOfUserId, findManyOrdersById, resolveMatchingOrders} from "@/app/actions/orders";

const OrdersPage = async () => {

  const { userId } = auth()
  // Hardcoded orders data
  const activeBuyOrdersIDs = await getActiveBuyOrdersOfUserId(userId);
  const activeBuyOrdersData = await findManyOrdersById(activeBuyOrdersIDs.map(order => order.orderId));

  const activeSellOrdersIDs = await getActiveSellOrdersOfUserId(userId);
  const activeSellOrdersData = await findManyOrdersById(activeSellOrdersIDs.map(order => order.orderId));

  // // const activeBuyOrdersData = await
  // console.log(activeBuyOrdersData, userId);

  return (
    <div>
      <CardContent>
        <h2 className="text-3xl  my-3">
          Orders
        </h2>
        <Table>
          <TableHeader>
            <TableRow className=' text-md'>
              <TableCell>Stock Name</TableCell>
              <TableCell>Order Type</TableCell>
              <TableCell>Buying Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Selling Price</TableCell> {/* Added column for selling price */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {activeBuyOrdersData.map(order => (
              <TableRow className='text-md font-semibold' key={order.id}>
                <TableCell>Evelyn Flores {order.influencerName}</TableCell>
                <TableCell>BUY</TableCell>
                <TableCell>₹{order.price}</TableCell>
                <TableCell>{order.quantity}</TableCell>

              </TableRow>
            ))}

            {activeSellOrdersData.map(order => (
              <TableRow className='text-md font-semibold' key={order.id}>
                <TableCell>Logan Paul</TableCell>
                <TableCell>Sell</TableCell>
                <TableCell>₹{order.price}</TableCell>
                <TableCell>{order.quantity}</TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </CardContent>
    </div>
  );
};

export default OrdersPage;
