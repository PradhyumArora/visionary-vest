import {NextRequest, NextResponse} from "next/server";
import {fluctuateSharePrices} from "@/app/actions/orders";

export default async function GET(req:NextRequest, res:NextResponse) {

        try {
            // Get the updated influencer prices
            const updatedInfluencers = await fluctuateSharePrices();

            // Return the updated influencer prices as JSON response
            return Response.json(updatedInfluencers);
        } catch (error) {
            console.error('Error fetching influencer prices:', error);
        return    Response.json({ message: 'Internal server error' });
        }
    }
}
