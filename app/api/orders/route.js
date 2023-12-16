import { NextResponse } from "next/server";

// get all order

export const GET = (req)=>{

    return NextResponse.json({
        message : 'all orders'
    })
    
}