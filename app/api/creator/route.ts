import {NextRequest, NextResponse} from "next/server";
import prismadb from "@/prisma";
import prisma from "@/prisma";
export async function POST(request: NextRequest) {
    console.log("INSIDE FIND CREATOR")
    const { id } = await request.json()
    const creator = await prisma.influencer.findUnique({
        where: {
          id: parseInt(id),
        },
      });
    console.log(creator)
    if(!creator){
        return Response.json({status:"error", message:"Creator not found"})
    }
    return Response.json({data: creator, status:"success"})
}
